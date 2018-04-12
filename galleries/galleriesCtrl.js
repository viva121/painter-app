app.controller('galleriesCtrl', function($scope, $location, paintingService) {
    $scope.paintings = [];
    paintingService.loadPaintings().then(function() {
        $scope.paintings = paintingService.paintings;
    }) 

    $scope.hideModal = true;
 
      $scope.showImgL = function(painting) {
        $scope.title =  painting.title;
        $scope.image =  painting.image;
        $scope.size =  painting.size;
        $scope.technique =  painting.technique;
        $scope.year =  painting.year;
        $scope.available =  painting.available;
        if(painting.available ==true) {
            $scope.availability = "Yes";
        } else {
            $scope.availability = "No";
        }
        
      }
      $scope.hideImgL = function() {
           $scope.hideModal = true;
      }


});
