app.factory('exhibitService', function($http, $q) {

    var exhibitions = [];
  //  var wasEverLoaded = false;

    function Exhibition(name, image, time, place, txt, id) {
        this.name = name;
        this.image = image;
        this.time = time;
        this.place = place;
        this.txt = txt;
        this.id = id;
     }


     function loadExibit() {
        var async = $q.defer();
    
        // Checking if the exhibitions were ever loaded
        //if (wasEverLoaded) {
          // Immediatly resolving the promise since exhibitions are already available
         // async.resolve();
       // } else {
          // Loading the data from JSON
          $http.get("data/db.json").then(function(response) {
            // on success
            exhibitions.splice(0,exhibitions.length)
            
            for(i = 0; i < response.data.exhibitions.length; i++) {
                exhibitions.unshift(new Exhibition(response.data.exhibitions[i].name, response.data.exhibitions[i].image, response.data.exhibitions[i].time, response.data.exhibitions[i].place, response.data.exhibitions[i].txt, response.data.exhibitions[i].id));
              }
          //  wasEverLoaded = true;
            async.resolve();
            
          }, function(response) {
            // on failure
           // $log.error("PAINTER-APP: " + JSON.stringify(response));
            async.reject();
          });
       // }
    
        return async.promise;
    }
     
  deleteExhbt = function(exhibition) {
      $http.delete("/exhibitions/" + exhibition.id).then( function() {
          exhibitions.splice(exhibitions.indexOf(exhibition), 1);
      });
          
  }   



    return {
        Exhibition : Exhibition,
        loadExibit : loadExibit,
        exhibitions : exhibitions,
        deleteExhbt : deleteExhbt
    }

});