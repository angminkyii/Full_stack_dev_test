 var app = angular.module('fullStackApp', ['ngRoute']);

(function(app){
    function config($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                templateUrl: '/index.html',
                controllerAs: 'vm'
            })
            .when('/register',{
                templateUrl: '/auth/register/register.html',
                controller: 'registerCtrl',
                controllerAs: 'vm'
            })
            .when('/login',{
                templateUrl: '/auth/login/login.html',
                controller: 'loginCtrl',
                controllerAs: 'vm'
            })
            .when('/profile',{
                templateUrl: '/profile/profile.html',
                controller: 'profileCtrl',
                controllerAs: 'vm'
            })
            .otherwise({redirectTo: '/'});

            $locationProvider.html5Mode(true);
    }
    
    //Dont understand what this is doing.
    function run($rootScope, $location, authentication){
        $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute){
            if($location.path() === '/profile' && !authentication.isLoggedIn()){
                $location.path('/');
            }
        });
    }

    app
        .config(['$routeProvider', '$locationProvider', config])
        .run(['$rootScope', '$location', 'authentication', run]);
})(app);