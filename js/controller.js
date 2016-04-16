//Main
app.controller('mainController', ["$rootScope", "$routeParams", "$cookies", "$scope", '$location','$q','permissionsFactory','userServer', function ($rootScope, $routeParams, $cookies, $scope, $location,$q,permissionsFactory,userServer) {
    $scope.title = '直销云';
    /*
    $scope.userInfo = {
        UserID: 1,
        userName: "头像",
        img: "img/user_img.png"
    }
     */
    $rootScope.prefix = "index.html#";
    $scope.$on('$routeChangeStart', function(scope, next, current) {
        var permission = next.$$route.islogin;
        $scope.navbarBottom=next.$$route.showBottom===undefined?true:next.$$route.showBottom;
        if(permission)
        {
            //alert(!permissionsFactory.isLogin(permission));
            var prome=userServer.isLogin();
            prome.then(function(data){
                if(data.code!=1)
                {
                    if($cookies.get('token'))
                    {
                        var token=$cookies.get('token');
                        userServer.autoLogin(token);
                    }
                    else{
                        $location.path('/login');
                    }
                }
            },function(data){
            })
            //if(!permissionsFactory.isLogin(permission))
            //{
            //    if($cookies.get('token'))
            //    {
            //        var token=$cookies.get('token');
            //        userServer.autoLogin(token);
            //    }
            //    else{
            //        $location.path('/login');
            //    }
            //}
        }
    });
}]);