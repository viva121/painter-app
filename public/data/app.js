var app = angular.module('painterApp',  ['ngRoute', 'ui.bootstrap']);

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
    }).when ("/contacts", {
      templateUrl: "contacts/contacts.html",
      controller: "contactsCtrl"
    }).when ("/contacts/:pName", {
      templateUrl: "contacts/contacts.html",
      controller: "contactsCtrl"
    }).when ("/login", {
      templateUrl: "login/login.html",
      controller: "loginCtrl"
    }).when ("/paintingModal", {
      templateUrl: "galleries/paintingModal.html",
      controller: "galleriesCtrl"
    })
    .otherwise({
        redirectTo: "/"
    });
    
});