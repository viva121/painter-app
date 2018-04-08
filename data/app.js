var app = angular.module('painterApp',  ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "home/home.html",
      controller: "homeCtrl"
    }).when ("/galleries", {
      templateUrl: "galleries/galleries.html",
      controller: "galleriesCtrl"
    }).when ("/dashboard", {
      templateUrl: "dashboard/dashboard.html",
      controller: "dashboardCtrl"
    }).when ("/dashboard/:dashId", {
      templateUrl: "dashboard/dashboard.html",
      controller: "dashboardCtrl"
    }).when ("/exhibitions", {
      templateUrl: "exhibitions/exhibitions.html",
      controller: "exhibitionsCtrl"
    }).otherwise({
        redirectTo: "/"
    });
});