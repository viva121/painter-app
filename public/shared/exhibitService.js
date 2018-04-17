app.factory('exhibitService', function($http, $q) {

    var exhibitions = [];
    var wasEverLoaded = false;

    function Exhibition(name, image, time, place, txt) {
        this.name = name;
        this.image = image;
        this.time = time;
        this.place = place;
        this.txt = txt;
     }


     function loadExibit() {
        var async = $q.defer();
    
        // Checking if the exhibitions were ever loaded
        if (wasEverLoaded) {
          // Immediatly resolving the promise since exhibitions are already available
          async.resolve();
        } else {
          // Loading the data from JSON
          $http.get("data/exhibitions.json").then(function(response) {
            // on success
            exhibitions.splice(0,exhibitions.length)
            
            for(i = 0; i < response.data.length; i++) {
                exhibitions.unshift(new Exhibition(response.data[i].name, response.data[i].image, response.data[i].time, response.data[i].place, response.data[i].txt));
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
        Exhibition : Exhibition,
        loadExibit : loadExibit,
        exhibitions : exhibitions
    }

});