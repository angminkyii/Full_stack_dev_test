var app = angular.module('fullStackApp');

(function(app){
    app.controller('loginCtrl', loginCtrl);
    loginCtrl.$inject = ['$location', 'authentication'];
    

    function loginCtrl($location, authentication){
        var vm = this;

        vm.credentials = {
            email: "",
            password: ""
        };

        vm.onSubmit = function(){
            authentication
                .login(vm.credentials)
                .error((err)=>{
                    alert(err);
                })
                .then(()=>{
                    $location.path('profile');
                });
        };
    }
})(app);