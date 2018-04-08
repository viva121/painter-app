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
          //  $scope.hideModal = false;
      }
      $scope.hideImgL = function() {
           $scope.hideModal = true;
      }
//console.log($location.url());
   $scope.urlGalleries = function() {
    if($location.url() === '/galleries') {
       var cls = "active";
    } else {var cls = "";}
    return cls;
   } 
});
