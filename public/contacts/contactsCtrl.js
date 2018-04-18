//app.controller('contactsCtrl', function ($scope, $http) {

    
    
    app.controller("contactsCtrl", ['$scope', '$http', 'activeUserService', function ($scope, $http, activeUserService) {

        $scope.isLoggedIn = function() {
            return activeUserService.isLoggedIn(); 
       }
       
       $scope.logout = function() {
           activeUserService.logout()
       }

       $scope.emlJS = function() {
        emailjs.send("gmail","painter_app_email_template",{name: "James", notes: "Check this out!"})
        .then(function(response) {
           console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
        }, function(err) {
           console.log("FAILED. error=", err);
        });
       }


            $scope.url = 'http://127.0.0.1:3000';
            $scope.formsubmit = function (isValid) {
    
                if (isValid) {
    
                    $http.post($scope.url, {"name": $scope.name, "email": $scope.email, "message": $scope.message}).
                            then(function (data, status) {
                                $scope.status = status;
                                $scope.data = data;
                                $scope.result = data; // Show result from server in our <pre></pre> element
                            })
                } else {
                    alert('Form is not valid');
                }
    
            }
    
        }]);




