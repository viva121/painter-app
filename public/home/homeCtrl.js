app.controller('homeCtrl', function($scope, activeUserService) {
 
$scope.isLoggedIn = function() {
     return activeUserService.isLoggedIn(); 
}

$scope.logout = function() {
    activeUserService.logout()
}
   
});
