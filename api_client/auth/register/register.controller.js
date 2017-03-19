var app = angular.module('fullStackApp');


(function (app) {
    app.controller('registerCtrl', registerCtrl);
    //console.log('In register controller');
    //console.log()
    registerCtrl.$inject = ['$location', 'authentication'];

    function registerCtrl($location, authentication) {

        var vm = this;

        vm.credentials = {
            name: "",
            email: "",
            password: ""
        };

        vm.onSubmit = function () {
            console.log('Submitting registration');
            authentication
                .register(vm.credentials)
                .then((res) => {
                    console.log('Registration successful.');
                    $location.path('profile');
                    console.log('Redirecting to profile.');
                }, (error)=>{
                    alert(error);
                });
        };
    }
})(app);