(function(){
    //declaring custom service to be injected
    angular
        .module('fullStackApp')
        .service('authentication', authentication);

    authentication.$inject = ['$http', '$window'];
    function authentication($http, $window){
        var saveToken = (token) => {
            console.log('Token saved.');
            console.log(token);
            $window.localStorage['app-token'] = token;
        };

        var getToken = () => {
            console.log(`Got token. ${$window.localStorage['app-token']}`);
            return $window.localStorage['app-token'];
        };

        var isLoggedIn = () => {
            var token = getToken();
            var payload;

            console.log(`isLoggedIn: ${token}`);

            if(token){
                payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                return payload.exp > Date.now() / 1000;
            }else{
                return false;
            }
        };

        var currentUser = () => {
            if(isLoggedIn()){
                var token = getToken();
                var payload = token.split('.')[1];
                payload = $window.atob(payload);
                payload = JSON.parse(payload);

                return {
                    email: payload.email,
                    name: payload.name
                };
            }
        };

        register = (user) => {
            return $http.post('/api/register', user).then((res)=>{
                console.log(`http registering: ${res.data.token}`);
                saveToken(res.data.token);
            });
        };

        login = (user) => {
            return $http.post('/api/login', user).then((res) => {
                saveToken(res.data.token);
            });
        };

        logout = () => {
            $window.localStorage.removeitem('app-token');
        };

        return {
            currentUser : currentUser,
            saveToken : saveToken,
            getToken : getToken,
            isLoggedIn : isLoggedIn,
            register : register,
            login : login,
            logout : logout
        };
    }

})();