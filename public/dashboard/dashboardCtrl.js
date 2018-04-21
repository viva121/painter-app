app.controller('dashboardCtrl', function($scope, $http, $routeParams, $location, $timeout, paintingDbService, exhibitService, activeUserService) {

// This is an authotization check. If the user is not logged going back to the home screen
    if (!activeUserService.isLoggedIn()) {
        $location.path("/");
        return;
    }

    $scope.logout = function() {
        activeUserService.logout();
        $location.path('/');
    }


    $scope.paintings = [];
    paintingDbService.loadPaintings().then(function() {
    $scope.paintings = paintingDbService.paintings;
    }) 
    
    
// Add New Image

$scope.addImg = function(name, image, title, size, technique, year, gallery, available) {
  paintingDbService.addImg(name, image, title, size, technique, year, gallery, available, $scope.errMsg, $scope.paintings);
}
/*
    $scope.addImg = function(name, image, title, size, technique, year, gallery, available) {
        if(available == undefined || available == null){
            available == false;
        }
        //console.log(name);
      if(image == "" || image == undefined || title == undefined ||  title == "" || size == undefined || size == "" || technique == undefined || technique == "" || year == undefined ||  year == "" || gallery == undefined || gallery == "" ) {
           
        $scope.errMsg = true;
            //console.log(errMsg);
        return;
        }
        $scope.errMsg = false; 
        
        name = "Svetlana Lukash";
        var newImg = new paintingDbService.Painting(name, image, title, size, technique, year, gallery, available );
        
        $http.post("/paintings", newImg).then( function() {
            newImg.name = "Svetlana Lukash";
            $scope.paintings.push(newImg);
            showHideSuccMsg();
        });
        skopeToUndefined();
       }
*/
    skopeToUndefined = function() {
        $scope.title = undefined;
            $scope.editItem._attachments_uri.image = undefined;
            $('#customFile').val("");
            $scope.size = undefined;
            $scope.technique = undefined;
            $scope.year = undefined;
            $scope.gallery = undefined;
            $scope.available = undefined;
            $scope.imgTxtP = "Choose image file...";
    }   

// Edit Existing Image
    $scope.saveEditImg = function () {
      paintingDbService.saveEditImg($scope.selectedItem, $scope.title, $scope.size, $scope.technique, $scope.year, $scope.gallery, $scope.available, $scope.hideModalEdit);
    }
      /*
       $scope.saveEditImg = function() {
        var itemId = $scope.selectedItem.id;
        paintingDbService.paintings[paintingDbService.paintings.indexOf($scope.selectedItem)].title = $scope.title;
            paintingDbService.paintings[paintingDbService.paintings.indexOf($scope.selectedItem)].size = $scope.size;
            paintingDbService.paintings[paintingDbService.paintings.indexOf($scope.selectedItem)].technique = $scope.technique;
            paintingDbService.paintings[paintingDbService.paintings.indexOf($scope.selectedItem)].year = $scope.year;
            paintingDbService.paintings[paintingDbService.paintings.indexOf($scope.selectedItem)].gallery = $scope.gallery;
            paintingDbService.paintings[paintingDbService.paintings.indexOf($scope.selectedItem)].available = $scope.available;
        $http.put("/paintings/" + itemId, $scope.selectedItem).then( function() {
            

            $scope.hideModalEdit = true;
            
        });     
      }
*/
 
$scope.deleteItem = function() {
    paintingDbService.deleteItem($scope.selectedItem);
    $scope.hideModalEdit = true;
}
/*
$scope.deleteItem = function() {
  var itemId = $scope.selectedItem.id;
        $http.delete("/paintings/" + itemId).then( function() {
            $scope.paintings.splice($scope.paintings.indexOf($scope.selectedItem), 1);
            $scope.hideModalEdit = true;
            
        });

            
      }
*/
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
            $scope.available = undefined;
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
            $scope.available = painting.available;
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
  
    //  Exhibitions ///////////////////////////////////////////////////////////////////////////////////////////////////
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

        $scope.imgTxt = "Choose image file...";
        showImgName = function() {
            if($scope.image != undefined || $scope.image != null || $scope.image != "") {
        $scope.imgTxt = "File is chosen" 
            }
        }
        $scope.imgTxt = "Choose image file...";
      $scope.showImgName = function() {
      $scope.imgTxt = "File is chosen" //$scope.editItem._attachments_uri_E.image;
      }
/*
        $scope.showExbtDetails = function(exhibition) {
            $scope.name =  exhibition.name;
            $scope.image =  exhibition.image;
            $scope.time =  exhibition.time;
            $scope.place =  exhibition.place;
            $scope.txt =  exhibition.txt;
            $scope.showImgName();
          }
*/
        showHideSuccMsg = function() {
            $scope.showSuccess = true;
            $timeout(function() {
            $scope.showSuccess = false;
            }, 3000);
         };
         
        showImgName();
        $scope.errMsgE = false; 
        $scope.showSuccess = false;

        // Save Edit Exhibition //////////////////////////////////////////////////////////////////
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

            if(exhibition.id == undefined) {
                exhibition.id = lastId;
            }

            $http.put("/exhibitions/" + exhibition.id, exhibition).then( function() {
                showImgName(); 
                showHideSuccMsg();
            });     

            
        }   
        
        // Add new Exhibition /////////////////////////////////////////////////////////////
        var lastId;
        $scope.addNewExhb = function() {
            //console.log(name);
          //  if(name == undefined || name == "" || image == undefined || image == "" || time == undefined || time == "" ||  place == undefined || place == "" || txt == undefined || txt == "") {
          //      $scope.errMsgE = true;
                //console.log(errMsgE);
          //      return;
          //  }
            $scope.errMsgE = false; 
            name = "";
            image = "";
            time = "";
            place = "";
            txt = "";
          
            var newExhbt = new exhibitService.Exhibition(name, image, time, place, txt);
            $scope.exhibitions.unshift(newExhbt);
            $http.post("/exhibitions", newExhbt).then( function() {
                var exhbCounter = $scope.exhibitions.length;

                $http.get("/exhibitions/")
                .then(function(response) {
                    lastId = 0;
                    for(var i =0; i < response.data.length; i++ ) {
                        if (response.data[i].id > lastId) {
                        lastId = response.data[i].id;
                    }
                    }
                    
                });

                $scope.name = "";
                $scope.image = "";
                $('#customFile').val("");
                $scope.time = "";
                $scope.place = "";
                $scope.txt = "";
                $scope.imgTxt = "Choose image file...";
            });

        }

    $scope.deleteExhbt = function (exhibition) {
        exhibitService.deleteExhbt(exhibition);
    }
/*
        $scope.deleteExhbt = function(exhibition) {
            $http.delete("/exhibitions/" + exhibition.id).then( function() {
                $scope.exhibitions.splice($scope.exhibitions.indexOf(exhibition), 1);
            });
                
        }   
*/
       

});