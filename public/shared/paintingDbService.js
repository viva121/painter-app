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

     function loadPaintings() {
        var async = $q.defer();
    
        // Checking if the movies was ever loaded
        
          // Loading the data from JSON
          $http.get("data/db.json").then(function(response) {
            // on success
            // !!! movies = [];
           // paintings.splice(0,paintings.length)
            //$log.debug("PAINTING-APP: " + JSON.stringify(response));
            for(i = 0; i < response.data.paintings.length; i++) {
                paintings.push(new Painting(response.data.paintings[i].name, response.data.paintings[i].image, response.data.paintings[i].title, response.data.paintings[i].size, response.data.paintings[i].technique, response.data.paintings[i].year, response.data.paintings[i].gallery, response.data.paintings[i].available,  response.data.paintings[i].comments, response.data.paintings[i].id));
              }
           // wasEverLoaded = true;
            async.resolve();
            
          }, function(response) {
            // on failure
           // $log.error("MOVIE-APP: " + JSON.stringify(response));
            async.reject();
          });
        
    
        return async.promise;
      }
      

    return {
            loadPaintings : loadPaintings,
            paintings : paintings,
            Painting : Painting
        }

});