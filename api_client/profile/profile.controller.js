var app = angular.module('fullStackApp');

(function(app){
    app.controller('profileCtrl', profileCtrl);
    console.log('In profile.');
    profileCtrl.$inject = ['$location', 'meanData'];
    function profileCtrl($location, meanData){
        var vm = this;

        vm.user = {};
        console.log('Getting profile.');
        meanData.getProfile()
            .then((res) => {
                vm.user = res.data;
            }, (error) => {
                console.log(error);
            });
    }
})(app);