
var app = angular.module("myShoppingApp", ["ngRoute"]);
app.controller("myCtrl", function ($scope) {
    $scope.products = ["Torch", "Phone", "Pen", "Milk"];
    $scope.addItem = function () {
        if (!$scope.addMe) {
            return;
        }
        if ($scope.products.indexOf($scope.addMe) == -1) {
            $scope.products.push($scope.addMe);
            $scope.addMe = null;
        } else {
            $scope.errortext = "The item is already in your shopping list.";
        }
    }
    $scope.removeItem = function (x) {
        alert(`Removed ${$scope.products[x]}`);
        $scope.products.splice(x, 1);
    }
});

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.html"
        })
        .when("/Torch", {
            templateUrl: "main.html"
            //template : "<h1>Hello</h1><p>Woolies</p>"
        });
});