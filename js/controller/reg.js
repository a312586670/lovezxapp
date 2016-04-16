/**
 * Created by D on 15/5/20.
 */
app.controller('reg',["$rootScope", "$scope",'userServer','alertFactory','commonFactory',function($rootScope,$scope,userServer,alertFactory,commonFactory) {
    $scope.btnswitch=false;//控制发送短信按钮启用开关
    $scope.sendcode = function(){
        var obj=$('#btnSend');
        $rootScope.loading=true;
        userServer.sendcode({
            pn:$scope.phone
        },function(data){
            if(data.code==1)
            {
                commonFactory.lastTime(obj,'active');//发送短信成功
            }
            else{
                alertFactory.setAlert(data.msg);
            }
            $rootScope.loading=false;//控制加载页面
        });
    };
    $scope.reg=function(){
        $scope.btnswitch=true;//控制发送短信按钮启用开关
        $rootScope.loading=true;
        userServer.reg({
            pn:$scope.phone,
            p:$scope.password,
            rpn:$scope.recphone,
            v:$scope.code
        },function(data){
            if(data.code==1)
            {
                alertFactory.setAlert("注册用户成功!");
                window.location.href="index.html#/login";
            }
            else{
                alertFactory.setAlert(data.msg);
            }
            $scope.btnswitch=false;//控制发送短信按钮启用开关
            $rootScope.loading=false;//控制加载页面
        })
    }
}]);
/**
 * Created by Administrator on 2015/5/20.
 */
