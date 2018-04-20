app.factory("activeUserService", function ($http, $log, $q) {
    function User(pUser) {
        this.email = pUser.email;
        this.password = pUser.password;
        this.fname = pUser.fname;
        this.lname = pUser.lname;
        this.data = pUser.data;
    }

    var activeUser = null;

    function load() {
        var async = $q.defer();

        $http.get('data/users.json').then(
            function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    users.push(new User(response.data[i]));
                }

                async.resolve();
                // Testing
                //alert(users[0].lname); 
            }, function (response) {
                $log.error("error in getting user json: " + JSON.stringify(response));
                async.reject();
        });

        return async.promise;
    
    }


    // This function will update the active user property with the logged in user
    // Will return true in case of successfull login. otherwise return false
    function login(email, pwd) {
        var async = $q.defer();

        $http.get('data/users.json').then(
            function (response) {
                for (var i = 0; i < response.data.length; i++) {
                    if (response.data[i].email === email && response.data[i].password === pwd) {
                        activeUser = new User(response.data[i]);
                        async.resolve(true);
                    }                
                }
                async.resolve(false);
            }, function (response) {
                $log.error("error in getting user json: " + JSON.stringify(response));
                async.reject();
        });

        return async.promise;
    }
    
    function getUser() {
        return activeUser;
    }
    
    function isLoggedIn() {
        return activeUser ? true : false;
    }

    function logout() {
        activeUser = null;
    }

    

    return {
        load: load,
        login: login,
        getUser: getUser,
        isLoggedIn: isLoggedIn,
        logout: logout,
        
    }
})