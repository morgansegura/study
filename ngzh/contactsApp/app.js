var app = angular.module('codecraft', [
    'ngResource',
    'infinite-scroll',
    'angularSpinner',
    'jcs-autoValidate',
    'angular-ladda',
    'mgcrea.ngStrap'
]);

// Config
app.config(function($httpProvider, $resourceProvider, laddaProvider) {
    $httpProvider.defaults.headers.common['Authorization'] = 'Token  f29dabb08f813a94597b549e34d27583ef329d46'
    $resourceProvider.defaults.stripTrailingSlashes = false;
    laddaProvider.setOption({
       style: 'expand-right'
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

// Person Detail Controller
app.controller('PersonDetailController', function ($scope, $modal, ContactService) {
    $scope.contacts = ContactService;

    $scope.remove = function () {
        $scope.contacts.removeContact($scope.contacts.selectedPerson);
    }

    $scope.delete = function () {
        $scope.contacts.updateContact($scope.contacts.selectedPerson);
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

    $scope.showCreateModal = function () {
        $scope.contacts.selectedPerson = {};
        $scope.createModal = $modal({
            scope: $scope,
            templateUrl: 'templates/modal.create.tpl.html',
            show: true
        });
    };

    $scope.createContact = function () {
        $scope.contacts.createContact($scope.contacts.selectedPerson)
            .then( function () {
                $scope.createModal.hide();
            });
    }

    // Watch search for newVal
    $scope.$watch('search', function (newVal, oldVal) {
       if (angular.isDefined(newVal)) {
           $scope.contacts.doSearch(newVal)
       }
    });
    // Watch sorting
    $scope.$watch('order', function (newVal, oldVal) {
       if (angular.isDefined(newVal)) {
           $scope.contacts.doOrder(newVal)
       }
    });

});

// Contact Service
app.service('ContactService', function(Contact, $q) {
    /* when dealing with APIs it is a good practice
    to have at least 3 variables assigned in the object */

    var self = {
        'addPerson' : function(person) {
            this.persons.push(person);
        },
        'page': 1,
        'hasMore': true,
        'isLoading': false,
        'isSaving': false,
        'selectedPerson': null,
        'persons': [],
        'search': null,
        'doSearch': function (search) {
            self.hasMore = true;
            self.page = 1;
            self.persons = [];
            self.search = search;
            self.loadContacts();
        },
        'doOrder': function (order) {
            self.hasMore = true;
            self.page = 1;
            self.persons = [];
            self.ordering = order;
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
            self.isSaving = true;
            person.$update().then(function () {
                self.isSaving = false;
            });
        },
        'removeContact': function (person) {
            self.isDeleting = true;
            person.$remove().then(function () {
                self.isDeleting = false;
                var index = self.persons.indexOf(person)
                self.persons.splice(index, 1);
                self.selectedPerson = null;
            });
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
                d.resolve();
            });
            return d.promise;
        }
    };

    self.loadContacts();

    return self;
});
