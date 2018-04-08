app.controller('dashboardCtrl', function($scope, $routeParams, paintingService, exhibitService) {
    $scope.paintings = [];
    paintingService.loadPaintings().then(function() {
    $scope.paintings = paintingService.paintings;
    }) 
    
    
// Add New Image
    $scope.addImg = function(name, image, title, size, technique, year, gallery) {
        //console.log(name);
      /*  if(name == undefined || famName == undefined || image == undefined || imbdLink == undefined || bday == undefined) {
            $scope.errMsg = true;
            //console.log(errMsg);
            return;
        }
        $scope.errMsg = false; */
        name = "Svetlana Lukash";
        var newImg = new paintingService.Painting(name, image, title, size, technique, year, gallery);
        newImg.name = "Svetlana Lukash";
        $scope.paintings.push(newImg);
        $scope.title = "";
        $scope.editItem._attachments_uri.image = "";
        $scope.size = "";
        $scope.technique = "";
        $scope.year = "";
        $scope.gallery = "";
       }

// Edit Existing Image
       $scope.saveEditImg = function() {
            paintingService.paintings[paintingService.paintings.indexOf($scope.selectedItem)].title = $scope.title;
            paintingService.paintings[paintingService.paintings.indexOf($scope.selectedItem)].size = $scope.size;
            paintingService.paintings[paintingService.paintings.indexOf($scope.selectedItem)].technique = $scope.technique;
            paintingService.paintings[paintingService.paintings.indexOf($scope.selectedItem)].year = $scope.year;
            paintingService.paintings[paintingService.paintings.indexOf($scope.selectedItem)].gallery = $scope.gallery;

            $scope.hideModalEdit = true;
      }

      $scope.deleteItem = function() {
            $scope.paintings.splice($scope.paintings.indexOf($scope.selectedItem), 1);
            $scope.hideModalEdit = true;
      }

      $scope.hideModal = true;
 
      $scope.showAddImg = function() {
            $scope.hideModal = false;
      }
      $scope.hideAddImg = function() {
           $scope.hideModal = true;
      }

      $scope.hideModalEdit = true;

      $scope.showEditImg = function(painting) {
            $scope.selectedItem = painting;
            $scope.hideModalEdit = false;
            $scope.title = painting.title;
            $scope.image = painting.image;
            $scope.size = painting.size;
            $scope.technique = painting.technique;
            $scope.year = painting.year;
            $scope.gallery = painting.gallery;
      }
      $scope.hideEditImg = function() {
           $scope.hideModalEdit = true;
      }
    //  Exhibitions /////////////////////////////////////////////////////////////////////////
      $scope.exhibitions = [];
      exhibitService.loadExibit().then(function() {
          $scope.exhibitions = exhibitService.exhibitions;
      }) 

      $scope.showPnt = true;
      $scope.showExhb = false;
      var dashToDisplay = $routeParams.dashId;
      switch(dashToDisplay) {
            case "pnt":
            $scope.showPnt = true;
            $scope.showExhb = false;
                break;
            case "exhb":
            $scope.showPnt = false;
            $scope.showExhb = true;
                break;
            default:
            $scope.showPnt = true;
            $scope.showExhb = false;
        }

        $scope.showExbtDetails = function(exhibition) {
            $scope.name =  exhibition.name;
            $scope.image =  exhibition.image;
            $scope.time =  exhibition.time;
            $scope.place =  exhibition.place;
            $scope.txt =  exhibition.txt;
          }

        $scope.saveEditExhb = function(exhibition) {
            exhibitService.exhibitions[exhibitService.exhibitions.indexOf($scope.exhibition)].name = $scope.name;
            exhibitService.exhibitions[exhibitService.exhibitions.indexOf($scope.exhibition)].image = $scope.image;
            exhibitService.exhibitions[exhibitService.exhibitions.indexOf($scope.exhibition)].time = $scope.time;
            exhibitService.exhibitions[exhibitService.exhibitions.indexOf($scope.exhibition)].place = $scope.place;
            exhibitService.exhibitions[exhibitService.exhibitions.indexOf($scope.exhibition)].txt = $scope.txt;
        }   
        
        $scope.addNewExhb = function(name, image, time, place, txt) {
            //console.log(name);
          /*  if(name == undefined || famName == undefined || image == undefined || imbdLink == undefined || bday == undefined) {
                $scope.errMsg = true;
                //console.log(errMsg);
                return;
            }
            $scope.errMsg = false; */
            var newExhbt = new exhibitService.Exhibition(name, image, time, place, txt);
            $scope.exhibitions.unshift(newExhbt);
            $scope.name = "";
            $scope.image = "";
            $scope.time = "";
            $scope.place = "";
            $scope.txt = "";
        }

        $scope.deleteExhbt = function(exhibition) {
                $scope.exhibitions.splice($scope.exhibitions.indexOf(exhibition), 1);
        }   
     

});