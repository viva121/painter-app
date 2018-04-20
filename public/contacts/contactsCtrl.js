//app.controller('contactsCtrl', function ($scope, $http) {

    
    
    app.controller("contactsCtrl", ['$scope', '$http', '$timeout', 'activeUserService', function ($scope, $http, $timeout, activeUserService) {

        $scope.isLoggedIn = function() {
            return activeUserService.isLoggedIn(); 
       }
       
       $scope.logout = function() {
           activeUserService.logout()
       }
      
       $scope.emlJS = function() {
        var result = "";
        emailjs.send("gmail","painter_app_email_template", {"from_name":$scope.name,"from_email":$scope.email,"message_html":$scope.message}) 
        .then(function(response) {
           
           console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
           result="Success!"
        }, function(err) {
           console.log("FAILED. error=", err);
           result = "Error. Please try again."
        });
        $scope.name = "";
        $scope.email = "";
        $scope.message = "";
        $scope.result = result;
return
}

/*
            $scope.url = 'http://127.0.0.1:3000';
            $scope.formsubmit = function (isValid) {
    
                if (isValid) {
    
                    $http.post($scope.url, {"name": $scope.name, "email": $scope.email, "message": $scope.message}).
                            then(function (data, status) {
                                $scope.status = status;
                                $scope.data = data;
                                $scope.result = "Thank you. Your message was sent."; // Show result from server in our <pre></pre> element
                            })
                } else {
                    $scope.result = "Error. Please try again."
                   // alert('Form is not valid');
                }
    
            }
*/
            showHideSuccMsg = function() {
                $scope.showSuccess = true;
                $timeout(function() {
                $scope.showSuccess = false;
                }, 3000);
             };    
    
        }]);




