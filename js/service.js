 var url='http://localhost:52923/';
app.service('userServer', ['$http','alertFactory','$cookies','$q',function ($http,alertFactory,$cookies,$q) {
    this.sendcode = function(postData,callback){
        $http({
            method:'GET',
            url:url+'user/sentcode',
            cache:false,
            dataType:'json',
            params:postData
        }).success(function(data, status, headers, config) {
            callback(data);
        }).error(function(data,status,headers,config){
            alert(data)
        })
    };
    this.reg=function(postData,callback){
      $http({
          method:'POST',
          url:url+'user/reg',
          cache:false,
          dataType:'json',
          params:postData
      }).success(function(data,status){
          callback(data);
      }).error(function (data,status,headers,config) {
          
      })
    };
    this.login=function(postData,callback){
        $http({
            method:'POST',
            url: url+'user/login',
            cache: false,
            dataType: 'json',
            params:postData
        }).success(function(data, status) {
            callback(data);
        }).error(function(data,status,headers,config){

        })
    };
    this.autoLogin=function(token) {
        this.login({
            pn:"",
            p:"",
            autov:token
        },function(data){
            if(data.code==1)
            {
                alertFactory.setAlert("自动登录成功!");
                if(data.data!=null)
                {
                    $cookies.put('token',data.data);
                }
            }
            else{
                $location.path('/login');
            }
        })
    };
    this.isLogin=function(){
        var def=$q.defer();
        $http({
            method:'POST',
            url: url+'user/islogin',
            cache: false,
            dataType: 'json'
        }).success(function(data, status) {
            def.resolve(data);
            //callback(data);
        }).error(function(data,status,headers,config){
            def.reject(data);
        })
        return def.promise
    }
    this.getUserInfo=function(callback){
        $http({
            method:'POST',
            url: url+'user/get_user',
            cache: false,
            dataType: 'json'
        }).success(function(data, status) {
            callback(data);
        }).error(function(data,status,headers,config){

        })
    }
}]);
