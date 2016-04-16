var app;
app = angular.module('app', [
    "ngRoute",
    'ngCookies',
    'ngSanitize',
    'mobile-angular-ui',
    'mobile-angular-ui.gestures'
]);

//angular.filterService=function(callback,result){
//    var bodyScope=angular.element(document.body).scope();
//    if(!result.state){
//        bodyScope.errorMsg=result.message;
////        bodyScope.$apply();
//    }else{
//
//    }
//    callback(result);
//    setTimeout(
//        function(){
//            var bodyScope=angular.element(document.body).scope();
//            bodyScope.errorMsg="";
//            bodyScope.$apply();
//        },
//        3000
//    )
//}
app.run(["userServer","$rootScope","$cookies","alertFactory","$location",function(userServer,$rootScope,$cookies,alertFactory,$location) {
    //$rootScope.$on('$routeChangeStart', function(evt, current, previous) {
    //    userServer.isLogin(function(data){
    //        if(data.code!=1)
    //        {
    //            if($cookies.get('token'))
    //            {
    //                var token=$cookies.get('token');
    //                userServer.autoLogin(token);
    //            }
    //            else{
    //                $location.path('/login');
    //            }
    //        }
    //        else{
    //            $location.path('/login');
    //        }
    //    });
    //
    //});
}]);
app.config(function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'view/index.html', reloadOnSearch: false,controller:'mainController',islogin:true});
    $routeProvider.when('/selectcity', { templateUrl: 'view/selectcity.html', reloadOnSearch: false });
    $routeProvider.when('/community', { templateUrl: 'view/community/community.html', reloadOnSearch: false });

    $routeProvider.when('/collect', { templateUrl: 'view/user/collect.html', reloadOnSearch: false});
    $routeProvider.when('/join', { templateUrl: 'view/user/join.html', reloadOnSearch: false });
    $routeProvider.when('/money', { templateUrl: 'view/user/money.html', reloadOnSearch: false });
    $routeProvider.when('/my', { templateUrl: 'view/user/my.html', reloadOnSearch: false ,controller:'user',islogin:true});
    $routeProvider.when('/myaccount', { templateUrl: 'view/user/myaccount.html', reloadOnSearch: false });
    $routeProvider.when('/record', { templateUrl: 'view/user/record.html', reloadOnSearch: false });
    $routeProvider.when('/tream', { templateUrl: 'view/user/tream.html', reloadOnSearch: false });
    $routeProvider.when('/treammanage', { templateUrl: 'view/user/treammanage.html', reloadOnSearch: false });

    $routeProvider.when('/create', { templateUrl: 'view/create.html', reloadOnSearch: false });
    $routeProvider.when('/customer', { templateUrl: 'view/customer.html', reloadOnSearch: false });
    $routeProvider.when('/customerlist', { templateUrl: 'view/customerlist.html', reloadOnSearch: false });
    $routeProvider.when('/findpwd', { templateUrl: 'view/findpwd.html', reloadOnSearch: false });
    $routeProvider.when('/login', { templateUrl: 'view/login.html', reloadOnSearch: false,controller:'user',showBottom:false });
    $routeProvider.when('/member', { templateUrl: 'view/member.html', reloadOnSearch: false });
    $routeProvider.when('/pwdset', { templateUrl: 'view/pwdset.html', reloadOnSearch: false });
    $routeProvider.when('/reg', { templateUrl: 'view/reg.html', reloadOnSearch: false,controller:'reg',showBottom:false});

    $routeProvider.when('/updatepwd', { templateUrl: 'view/reg.html', reloadOnSearch: false });
    $routeProvider.when('/need', { templateUrl: 'view/need.html', reloadOnSearch: false });
    $routeProvider.when('/person', { templateUrl: 'view/person.html', reloadOnSearch: false });
    $routeProvider.when('/more', { templateUrl: 'view/more.html', reloadOnSearch: false });
});