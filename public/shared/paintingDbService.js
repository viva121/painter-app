app.factory('paintingDbService', function($http, $q) {

    var paintings = [];
    var wasEverLoaded = false;

    function Painting(name, image, title, size, technique, year, gallery, available, comments, id) {
        this.name = name;
        this.image = image;
        this.title = title;
        this.size = size;
        this.technique = technique;
        this.year = year;
        this.gallery = gallery;
        this.available = available;
        this.comments = comments;
        this.id = id;
     }
// Unic number generator (not in use)
     function uniqueNumber() {
        var date = Date.now();
        
        if (date <= uniqueNumber.previous) {
            date = ++uniqueNumber.previous;
        } else {
            uniqueNumber.previous = date;
        }
    
        return date;
    }
    
    uniqueNumber.previous = 0;
    
    function idNr(){
      return uniqueNumber();
    };

// Loading painting  ////////////////////////////////////////////////////////////////////////    
     function loadPaintings() {
        var async = $q.defer();
        
          // Loading the data from JSON
          $http.get("data/db.json").then(function(response) {
            // on success
            
          paintings.splice(0,paintings.length)
            //$log.debug("PAINTING-APP: " + JSON.stringify(response));
            for(i = 0; i < response.data.paintings.length; i++) {
                paintings.push(new Painting(response.data.paintings[i].name, response.data.paintings[i].image, response.data.paintings[i].title, response.data.paintings[i].size, response.data.paintings[i].technique, response.data.paintings[i].year, response.data.paintings[i].gallery, response.data.paintings[i].available,  response.data.paintings[i].comments, response.data.paintings[i].id));
              }
           // wasEverLoaded = true;
            async.resolve();
            
          }, function(response) {
            // on failure
           // $log.error("PAINTER-APP: " + JSON.stringify(response));
            async.reject();
          });
        
    
        return async.promise;
      }

// Save edited painting  ///////////////////////////////////////////////////////////////      
      saveEditImg = function(selectedItem, title, size, technique, year, gallery, available, hideModalEdit) {
        var itemId = selectedItem.id;
            paintings[paintings.indexOf(selectedItem)].title = title;
            paintings[paintings.indexOf(selectedItem)].size = size;
            paintings[paintings.indexOf(selectedItem)].technique = technique;
            paintings[paintings.indexOf(selectedItem)].year = year;
            paintings[paintings.indexOf(selectedItem)].gallery = gallery;
            paintings[paintings.indexOf(selectedItem)].available = available;
        $http.put("/paintings/" + itemId, selectedItem).then( function() {
            

            hideModalEdit = true;
            
        });     
      }  

// Add new painting  ///////////////////////////////////////////////////////////////      
      addImg = function(name, image, title, size, technique, year, gallery, available, errMsg, paintings) {
        if(available == undefined || available == null){
            available == false;
        }
        
      if(image == "" || image == undefined || title == undefined ||  title == "" || size == undefined || size == "" || technique == undefined || technique == "" || year == undefined ||  year == "" || gallery == undefined || gallery == "" ) {
           
        errMsg = true;
            
        return;
        }
        errMsg = false; 
        
        //name = "Svetlana Lukash";
        var newImg = new Painting(name, image, title, size, technique, year, gallery, available );
        
        $http.post("/paintings", newImg).then( function() {
            newImg.name = "Svetlana Lukash";
            paintings.push(newImg);
            showHideSuccMsg();
        });
        skopeToUndefined();   
       }

  // Delete painting  ///////////////////////////////////////////////////////////////
       deleteItem = function(selectedItem) {
        var itemId = selectedItem.id;
                $http.delete("/paintings/" + itemId).then( function() {
                    paintings.splice(paintings.indexOf(selectedItem), 1);
                  
                    
                });
        
                    
              }   

    return {
            loadPaintings : loadPaintings,
            paintings : paintings,
            Painting : Painting,
            saveEditImg: saveEditImg,
            addImg : addImg,
            deleteItem : deleteItem
        }

});