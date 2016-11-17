var app = angular.module('minmax', [
    'jcs-autoValidate',
    'angular-ladda'
]);

app.run(function (defaultErrorMessageResolver) {
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
        errorMessages['tooYoung'] = 'You must be at least {0} years old to use this site';
        errorMessages['tooOld'] = 'You must be max {0} years old to use this site';
        errorMessages['badUsername'] = 'Username can only contain letters and numbers';
        errorMessages['badPassword'] = 'Password must be at least 8 characters, contain 1 capital letter aan a number';
    })
});

app.controller('MinMaxCtrl', function ($scope, $http) {
    $scope.formModel = {};
    $scope.submitting = false;

    $scope.onSubmit = function () {

        $scope.submitting = true;

        $http.post('https://minmax-server.herokuapp.com/register/', $scope.formModel).
        success(function (data) {
            console.log(":)")
            $scope.submitting = false;
        }).error(function(data) {
            console.log(":(");
            $scope.submitting = false;
        });

        console.log('Hey, I am submitted!');
        console.log($scope.formModel);

    }
});
