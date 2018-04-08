app.controller('exhibitionsCtrl', function($scope, $location, exhibitService) {
   
    $scope.exhibitions = [];
    exhibitService.loadExibit().then(function() {
        $scope.exhibitions = exhibitService.exhibitions;
    }) 

    $scope.urlExhb = function() {
        if($location.url() === '/exhibitions') {
           var cls = "active";
        } else {var cls = "";}
        return cls;
       } 
   
});
