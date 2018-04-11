app.controller('dashboardCtrl', function($scope, $routeParams, paintingService, exhibitService) {
    $scope.paintings = [];
    paintingService.loadPaintings().then(function() {
    $scope.paintings = paintingService.paintings;
    }) 
    
    
// Add New Image

/* show file value after file select */

//$scope.editItem = {};
//$scope.showImgFile = function() {
//    console.log("showImgFile");
//    console.log($scope.editItem._attachments_uri.image);
//}
/*
$('.my-file-input').on('change',function(){
  
    $(this).next('.form-control-file').addClass("selected").html($(this).val());
    })

    $scope.integerval = /^\d*$/;
*/
    $scope.addImg = function(name, image, title, size, technique, year, gallery) {
        //console.log(name);
      if(image == "" || image == undefined || title == undefined ||  title == "" || size == undefined || size == "" || technique == undefined || technique == "" || year == undefined ||  year == "" || gallery == undefined || gallery == "") {
           
        $scope.errMsg = true;
            //console.log(errMsg);
        return;
        }
        $scope.errMsg = false; 
        name = "Svetlana Lukash";
        var newImg = new paintingService.Painting(name, image, title, size, technique, year, gallery);
        newImg.name = "Svetlana Lukash";
        $scope.paintings.push(newImg);
        $scope.title = undefined;
        $scope.editItem._attachments_uri.image = undefined;
        $('#customFile').val("");
        $scope.size = undefined;
        $scope.technique = undefined;
        $scope.year = undefined;
        $scope.gallery = undefined;
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
            $scope.errMsg = false;
            $scope.hideModalEdit = true;
            $scope.title = undefined;
            // $scope.editItem._attachments_uri.image = "";
            $scope.size = undefined;
            $scope.technique = undefined;
            $scope.year = undefined;
            $scope.gallery = undefined;
      }
      $scope.hideAddImg = function() {
           $scope.hideModal = true;
      }

      $scope.hideModalEdit = true;

      $scope.showEditImg = function(painting) {
            $scope.hideModal = true;
            $scope.hideModalEdit = false;
            $scope.selectedItem = painting;
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

      $scope.imgTxtP = "Choose image file...";
      $scope.showImgNameP = function() {
      $scope.imgTxtP = "File is chosen" //$scope.editItem._attachments_uri_E.image;
      }

      $scope.propertyName = 'painting.year';
      $scope.reverse = true;
 

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };
  
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

      //  $scope.imgTxt = "Choose image file...";
      //  $scope.showImgName = function() {
      //  $scope.imgTxt = "File is chosen" //$scope.editItem._attachments_uri_E.image;
      //  }

        $scope.showExbtDetails = function(exhibition) {
            $scope.name =  exhibition.name;
            $scope.image =  exhibition.image;
            $scope.time =  exhibition.time;
            $scope.place =  exhibition.place;
            $scope.txt =  exhibition.txt;
          }

        $scope.errMsgE = false; 
        $scope.saveEditExhb = function(exhibition) {
            
            if(exhibition.name == undefined || exhibition.name == "" || exhibition.image == undefined || exhibition.image == "" || exhibition.time == undefined || exhibition.time == "" ||  exhibition.place == undefined || exhibition.place == "" || exhibition.txt == undefined || exhibition.txt == "") {
                     $scope.errMsgE = true;
                     console.log($scope.errMsgE);
                     return;
            }
            $scope.errMsgE = false; 
            exhibitService.exhibitions[exhibitService.exhibitions.indexOf(exhibition)].name = exhibition.name;
            exhibitService.exhibitions[exhibitService.exhibitions.indexOf(exhibition)].image = exhibition.image;
            exhibitService.exhibitions[exhibitService.exhibitions.indexOf(exhibition)].time = exhibition.time;
            exhibitService.exhibitions[exhibitService.exhibitions.indexOf(exhibition)].place = exhibition.place;
            exhibitService.exhibitions[exhibitService.exhibitions.indexOf(exhibition)].txt = exhibition.txt;
        }   
        
        $scope.addNewExhb = function(name, image, time, place, txt) {
            //console.log(name);
          //  if(name == undefined || name == "" || image == undefined || image == "" || time == undefined || time == "" ||  place == undefined || place == "" || txt == undefined || txt == "") {
          //      $scope.errMsgE = true;
                //console.log(errMsgE);
          //      return;
          //  }
            $scope.errMsgE = false; 
            var newExhbt = new exhibitService.Exhibition(name, image, time, place, txt);
            $scope.exhibitions.unshift(newExhbt);
            $scope.name = "";
           $scope.image = "";
           //  $scope.editItem._attachments_uri_E.image = undefined;
           //  $('#customFile').val("");
            $scope.time = "";
            $scope.place = "";
            $scope.txt = "";
        }

        $scope.deleteExhbt = function(exhibition) {
                $scope.exhibitions.splice($scope.exhibitions.indexOf(exhibition), 1);
        }   

       

});