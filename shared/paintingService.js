app.factory('paintingService', function($http, $q) {

    var paintings = [];
    var wasEverLoaded = false;

    function Painting(name, image, title, size, technique, year, gallery, comments) {
        this.name = name;
        this.image = image;
        this.title = title;
        this.size = size;
        this.technique = technique;
        this.year = year;
        this.gallery = gallery;
        this.comments = comments;
     }

     function loadPaintings() {
        var async = $q.defer();
    
        // Checking if the movies was ever loaded
        if (wasEverLoaded) {
          // Immediatly resolving the promise since movies is already available
          async.resolve();
        } else {
          // Loading the data from JSON
          $http.get("data/paintings.json").then(function(response) {
            // on success
            // !!! movies = [];
            paintings.splice(0,paintings.length)
            //$log.debug("PAINTING-APP: " + JSON.stringify(response));
            for(i = 0; i < response.data.length; i++) {
                paintings.push(new Painting(response.data[i].name, response.data[i].image, response.data[i].title, response.data[i].size, response.data[i].technique, response.data[i].year, response.data[i].gallery,  response.data[i].comments));
              }
            wasEverLoaded = true;
            async.resolve();
            
          }, function(response) {
            // on failure
           // $log.error("MOVIE-APP: " + JSON.stringify(response));
            async.reject();
          });
        }
    
        return async.promise;
      }
      

    return {
            loadPaintings : loadPaintings,
            paintings : paintings,
            Painting : Painting
        }

});