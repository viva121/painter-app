app.controller('loginCtrl', function($scope, activeUserService, $log, $location) {

    $scope.invalidCredentails = false;

    $scope.hideAlert = function() {
        $scope.invalidCredentails = false;
    }
    

    $scope.login = function() {
        // TODO: Here you should disable the login button until there is a response from the service
        $scope.loginDisabled = true;
        activeUserService.login($scope.email, $scope.pwd).then(function(successLogin) {
            $scope.loginDisabled = false;
            if (successLogin) {
                $location.path("/dashboard");
            } else {
                // TODO: Missing hadleing of next try
                $scope.invalidCredentails = true;
            }
        })
    }
});