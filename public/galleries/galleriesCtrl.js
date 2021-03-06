app.controller('galleriesCtrl', function($scope, $location, $uibModal, paintingDbService, activeUserService) {
   
    $scope.isLoggedIn = function() {
        return activeUserService.isLoggedIn(); 
   }
   
   $scope.logout = function() {
       activeUserService.logout()
   }
   $scope.galleries = [];
   paintingDbService.loadGalleries().then(function(){
    $scope.galleries = paintingDbService.galleries;
   });
   
    $scope.paintings = [];
    paintingDbService.loadPaintings().then(function() {
        $scope.paintings = paintingDbService.paintings;
    }); 

    $scope.hideModal = true;
 
      $scope.showImgL = function(painting) {
          console.log("open modal");
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

    $scope.changeGalleryFilterName = function (filter) {
        $scope.chosenFilter = filter;
    }

    $scope.filterGal = function (painting) {
        
        if($scope.chosenFilter == undefined || $scope.chosenFilter == painting.gallery) {
            return true;
        } else {
            return false;
        }
    }
        

        
        
      

    var $uibModalInstance =  $scope.open = function (painting) {
          console.log($uibModalInstance);
          

        $uibModal.open({
          
          templateUrl: 'galleries/paintingModal.html',
          controller: /*'galleriesCtrl',
          bindToController: true */
        
          function ($scope, $uibModalInstance) {
            $scope.ok = function () {
              $uibModalInstance.close();
            };
          
            $scope.cancel = function () {
              $uibModalInstance.dismiss('cancel');
            };
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
          $scope.paintingRequest = function(title) {
            $uibModalInstance.close();  
            $location.path('/contacts');
          }
          } 
        })

       
      };

      $scope.hideImgL = function() {
           $scope.hideModal = true;
      }


});
