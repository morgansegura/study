var app = angular.module('codecraft', [
    'ngResource',
    'infinite-scroll',
    'angularSpinner',
    'jcs-autoValidate',
    'angular-ladda',
    'mgcrea.ngStrap',
    'toaster',
    'ngAnimate',
    'ui.router'
]);

// Config
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('list', {
            url: "/",
            views: {
                'main': {
                    templateUrl: 'templates/list.html',
                    controller: 'PersonListController'
                },
                'search': {
                    templateUrl: 'templates/searchform.html',
                    controller: 'PersonListController'
                }
            }
        })
        .state('edit', {
            url: "/edit/:email",
            views: {
                'main': {
                    templateUrl: 'templates/edit.html',
                    controller: 'PersonDetailController'
                }
            }
        })
        .state('create', {
            url: "/create",
            views: {
                'main': {
                    templateUrl: 'templates/edit.html',
                    controller: 'PersonCreateController'
                }
            }
        });
    $urlRouterProvider.otherwise('/');
});

// Config
app.config(function($httpProvider, $resourceProvider, laddaProvider, $datepickerProvider) {
    $httpProvider.defaults.headers.common['Authorization'] = 'Token  f29dabb08f813a94597b549e34d27583ef329d46'
    $resourceProvider.defaults.stripTrailingSlashes = false;
    laddaProvider.setOption({
       style: 'expand-right'
    });
    angular.extend($datepickerProvider.defaults,  {
       dateFormat: 'M/d/yyyy',
        autoclose: true
    });
});

// Create the CRUD factory
app.factory('Contact', function ($resource){
    return $resource('https://codecraftpro.com/api/samples/v1/contact/:id/', {id: '@id'}, {
        update: {
                method: 'PUT'
            }
    });
});

// Directives
app.directive('ccSpinner', function () {
    // (Attribute, Element, Class) A, E, C or any combination
    // A :  <div directive-name></div>
    // E : <directive-name></directive-name>
    // C : <div class="directive-name"></div>
    // Transclude will allow for html edits to the directive at the template level (false by default)
   return {
       'restrict': 'AE',
       'templateUrl': 'templates/spinner.html',
       'scope': {
           // isolate scope for use with multiple scope functions
           'isLoading': '=',
           'message': '@' // implement a string
       }
   }
});

// Business card
app.directive('ccCard', function () {

   return {
       'transclude': true,
       'restrict': 'AE',
       'templateUrl': 'templates/card.html',
       'scope': {
            'user': '=',
           'deleteUser': '&'
       },
       'controller': function ($scope, ContactService) {
           $scope.isDeleting = false;
           $scope.deleteUser = function () {
               $scope.isDeleting = true;
               ContactService.removeContact($scope.user).then(function () {
                   $scope.isDeleting = false;
               });
           };
       }
   }
});


// Default image filter
app.filter('defaultImage', function () {
   return function (input, param) {
        // console.log(input);
       // console.log(param);
       if (!input) {
            return param;
       }
       return input;
   }
});

// Person Detail Controller
app.controller('PersonDetailController', function ($scope, $stateParams, $state, $modal, ContactService) {

    $scope.mode = 'Edit';

    $scope.contacts = ContactService;

    $scope.contacts.selectedPerson = $scope.contacts.getPerson($stateParams.email);

    $scope.save = function () {
        $scope.contacts.updateContact($scope.contacts.selectedPerson).then(function () {
            $state.go('list');
        });
    }

    $scope.remove = function () {
        $scope.contacts.removeContact($scope.contacts.selectedPerson).then(function () {
            $state.go('list');
        });
    }

});

// Person Detail Controller
app.controller('PersonCreateController', function ($scope, $state, ContactService) {

    $scope.mode = 'Create';

    $scope.contacts = ContactService;

    $scope.save = function () {
        $scope.contacts.createContact($scope.contacts.selectedPerson)
            .then( function () {
                $state.go('list');
            });
    }
});

// Person List Controller
app.controller('PersonListController', function ($scope, $modal, ContactService) {

    $scope.search = "";
    $scope.order = "email";
    $scope.contacts = ContactService;

    $scope.loadMore = function () {
        console.log('Load More !!!');
        $scope.contacts.loadMore();
    };

    $scope.parentDeleteUser = function (user) {
        $scope.contacts.removeContact(user);
    }

    $scope.showCreateModal = function () {
        $scope.contacts.selectedPerson = {};
        $scope.createModal = $modal({
            scope: $scope,
            templateUrl: 'templates/modal.create.tpl.html',
            show: true
        });
    };
});

// Contact Service
app.service('ContactService', function(Contact, $q, $rootScope, toaster) {
    /* when dealing with APIs it is a good practice
    to have at least 3 variables assigned in the object */

    var self = {
        'getPerson' : function(email) {
            for (var i = 0; i < self.persons.length; i++) {
                var obj = self.persons[i];
                if (obj.email == email) {
                    return obj;
                }
            }
        },
        'page': 1,
        'hasMore': true,
        'isLoading': false,
        'isSaving': false,
        'selectedPerson': null,
        'persons': [],
        'search': null,
        'ordering': 'name',
        'doSearch': function () {
            self.hasMore = true;
            self.page = 1;
            self.persons = [];
            self.loadContacts();
        },
        'doOrder': function () {
            self.hasMore = true;
            self.page = 1;
            self.persons = [];
            self.loadContacts();
        },
        'loadContacts': function () {

            if (self.hasMore && !self.isLoading) {
                self.isLoading = true;

                var params = {
                    'page': self.page,
                    'search': self.search,
                    'ordering': self.ordering
                };

                Contact.get(params, function (data) {
                    console.log(data);
                    angular.forEach(data.results, function (person) {
                        self.persons.push(new Contact(person));
                    });

                    if (!data.next) {
                        self.hasMore = false;
                    }
                    self.isLoading = false;
                });
            }
        },
        'loadMore': function () {
            if (self.hasMore && !self.isLoading) {
                self.page += 1;
                self.loadContacts()
            }
        },
        'updateContact': function (person) {
            var d = $q.defer();
            self.isSaving = true;
            person.$update().then(function () {
                self.isSaving = false;
                toaster.pop('success', 'Updated ' + person.name);
                d.resolve();
            });
            return d.promise;
        },
        'removeContact': function (person) {
            var d = $q.defer();
            self.isDeleting = true;
            person.$remove().then(function () {
                self.isDeleting = false;
                var index = self.persons.indexOf(person)
                self.persons.splice(index, 1);
                self.selectedPerson = null;
                toaster.pop('success', 'Deleted ' + person.name);
                d.resolve();
            });
            return d.promise;
        },
        'createContact': function (person) {
            var d = $q.defer();
            self.isSaving = true;
            Contact.save(person).$promise.then(function () {
                self.isSaving = false;
                self.selectedPerson = null; // reset selected person
                self.hasMore = true; // hasMore contacts
                self.page = 1; // set to page 1
                self.persons = []; // reload array
                self.loadContacts(); // reload contacts
                toaster.pop('success', 'Created ' + person.name);
                d.resolve();
            });
            return d.promise;
        },
        'watchFilters': function () {
            $rootScope.$watch(function () {
               return self.search;
            }, function (newVal) {
                if (angular.isDefined(newVal)) {
                    self.doSearch();
                }
            });

            $rootScope.$watch(function () {
                return self.ordering;
            }, function (newVal) {
                if (angular.isDefined(newVal)) {
                    self.doOrder();
                }
            });
        }
    };

    self.loadContacts();
    self.watchFilters();

    return self;
});
