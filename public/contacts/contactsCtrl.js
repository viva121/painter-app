//app.controller('contactsCtrl', function ($scope, $http) {

    
    
    app.controller("contactsCtrl", ['$scope', '$http', 'activeUserService', function ($scope, $http, activeUserService) {

        $scope.isLoggedIn = function() {
            return activeUserService.isLoggedIn(); 
       }
       
       $scope.logout = function() {
           activeUserService.logout()
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




/*    $scope.result = 'hidden';
    $scope.resultMessage;
    $scope.formData; //formData is an object holding the name, email, subject, and message
    $scope.submitButtonDisabled = false;
    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
    $scope.sbmt = function(contactform) {
        $scope.submitted = true;
        $scope.submitButtonDisabled = true;
        if (contactform.$valid) {

            $http({
                method  : 'POST',
                url     : 'contact-form.php',
                data    : $.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
              }).then(function successCallback(data) {
                console.log(data);
               // if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
              //  } else {
              //      $scope.submitButtonDisabled = false;
              //      $scope.resultMessage = data.message;
              //      $scope.result='bg-danger';
              //  }
                }, function errorCallback(data) {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = 'Failed! Please fill out all the fields.';
                    $scope.result='bg-danger';
                });
/*
            $http({
                method  : 'POST',
                url     : 'contact-form.php',
                data    : $.param($scope.formData),  //param method from jQuery
                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
            }).success(function(data){
                console.log(data);
                if (data.success) { //success comes from the return json object
                    $scope.submitButtonDisabled = true;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-success';
                } else {
                    $scope.submitButtonDisabled = false;
                    $scope.resultMessage = data.message;
                    $scope.result='bg-danger';
                }
            }); */
 /*       } else {
            $scope.submitButtonDisabled = false;
            $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
            $scope.result='bg-danger';
        }
    }
*/

//});