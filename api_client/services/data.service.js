var app = angular.module('fullStackApp');

(function(app) {
    app.service('meanData', meanData);

    meanData.$inject = ['$http', 'authentication'];
    function meanData ($http, authentication){
        var getProfile = function(){
            console.log('HTTP getting profile.');
            return $http.get('/api/profile', {
                headers: {
                    Authorization: 'Bearer '+ authentication.getToken()
                }
            });
        };
        console.log('Returning profile.');
        return {
            getProfile : getProfile
        };
    }
})(app);