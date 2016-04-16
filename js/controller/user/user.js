/**
 * Created by D on 15/5/20.
 */
app.controller('user',["$rootScope", "$scope",'$cookies','userServer','alertFactory','userInfoFactory',function($rootScope,$scope,$cookies,userServer,alertFactory,userInfoFactory) {
    $scope.btnswitch=false;//控制发送短信按钮启用开关
    $scope.userinfo=[];
    //$scope.userinfo=userInfoFactory.getUserInfo();
    $scope.login=function(){
        if($cookies.get('token'))
        {
            $scope.autov=$cookies.get('token');
        }
        $scope.btnswitch=true;//控制发送短信按钮启用开关
        $rootScope.loading=true;
        userServer.login({
            pn:$scope.user,
            p:$scope.password,
            autov:$scope.autov
        },function(data){
            if(data.code==1)
            {
                alertFactory.setAlert("登录成功!");
                if(data.data!=null)
                {
                    $cookies.put('token',data.data);
                }
                window.location.href="index.html#/";
            }
            else{
                alertFactory.setAlert(data.msg);
            }
            $scope.btnswitch=false;//控制发送短信按钮启用开关
            $rootScope.loading=false;//控制加载页面
        })
    };

}]);
/**
 * Created by D on 2015/5/20.
 */
