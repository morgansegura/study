var app = angular.module('minmax', []);

app.controller('MinMaxCtrl', function ($scope, $http) {
    $scope.formModel = {};

    $scope.onSubmit = function (valid) {

        if (valid) {
            $http.post('https://minmax-server.herokuapp.com/register/', $scope.formModel).
            success(function (data) {
                console.log(":)")
            }).error(function(data) {
                console.log(":(");
            });

            console.log('Hey, I am submitted!');
            console.log($scope.formModel);
        } else {
            console.log("Invalid form");
        }

    }
});