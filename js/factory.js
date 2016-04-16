app.factory('alertFactory',['$http','$window', function ($http,$window) {
    return {
        setAlert: function(message, position, delay) {//自动消失弹窗  a:提示语;（已重写成功）
                var $w =angular.element(window), $toast = angular.element('<div class="ui-popup disappearDialog">' + message + '</div>');
                var top = '50%', left = "50%", m = "0 0 0 0";
                if (!isNaN(position)) {
                    delay = Math.max(1000, Number(position));
                }
                else {
                    delay = 2000;
                }
                var removeToast = function () {
                    angular.element(this).remove();
                };
                $toast.appendTo(angular.element(document.body)).delay(delay);
                if (position == 'top') {
                    top = 75;
                }
                else if (position == 'bottom') {
                    top =$w.height() - $toast.outerHeight() / 2 - 70;
                }
                if ($w.width() == $toast.outerWidth(true)) {
                    left = 0;
                    m = '-' + $toast.outerHeight() / 2 + 'px 1rem 0 1rem';
                } else {
                    m = '-' + $toast.outerHeight() / 2 + 'px 0 0 -' + $toast.outerWidth() / 2 + 'px';
                }
                $toast.css({
                    left: left,
                    top: top,
                    margin: m,
                    visibility: 'visible'
                });
                $toast.fadeOut(400, removeToast);
            },
        confirmDialog:function(a, callback, okBtnText, cancelBtnText) {//confirm弹窗  a:提示语;（已重复修改完成）
                var $m=angular.element(document.body);
                var dialogId = "J_ConfirmDialogId";
                var $w =angular.element(window);
                var top = '50%', left = "50%", m = "0 0 0 0";
                var okText = okBtnText == undefined ? "确定" : okBtnText,
                    cancelText = cancelBtnText == undefined ? "取消" : cancelBtnText;
                var removeToast = function () {
                    angular.element(this).remove();
                };
                if ($("#" + dialogId).length == 0) {
                    var dialogHtml = '<div  class="confirmDialog" id="' + dialogId + '" >';
                    dialogHtml += '<div class="confirmDialog-content">' + a + '</div>';
                    dialogHtml += '<ul class="confirmDialog-btns clearfix"><li><a href="javascript:void(0)" class="ui-btn j_ConfirmCancel">' + cancelText + '</a></li><li><a href="javascript:void(0)" class="ui-btn j_ConfirmOK">' + okText + '</a></li></ul></div>';
                    $(dialogHtml).appendTo($m);
                    if ($w.width() ==$("#" + dialogId).outerWidth(true)) {
                        left = 0;
                        m = '-' + $("#" + dialogId).outerHeight() / 2 + 'px 1rem 0 1rem';
                    } else {
                        m = '-' +$("#" + dialogId).outerHeight() / 2 + 'px 0 0 -' + $("#" + dialogId).outerWidth() / 2 + 'px';
                    }
                    $("#" + dialogId).css({
                        left: left,
                        top: top,
                        margin: m
                    });

                    $("#" + dialogId).find(".j_ConfirmOK").bind("click", function (ev) {
                        $("#" + dialogId).fadeOut(400, removeToast);
                        callback();
                    });
                    $("#" + dialogId).find(".j_ConfirmCancel").bind("click", function (ev) {
                        $("#" + dialogId).fadeOut(200, removeToast);
                    });
                } else {
                    $("#" + dialogId).find(".confirmDialog-content").html(a);
                    $("#" + dialogId).find(".j_ConfirmOK").html(okText);
                    $("#" + dialogId).find(".j_ConfirmCancel").html(cancelText);
                }
            }
    }
}])
app.factory('commonFactory',['$http','$window',function($http,$window){
    return{//#region 60秒倒计时
        lastTime:function(el,disCls) {
            if (el.length < 1)
                return;
            var oldText =el.html();
            if (el.hasClass(disCls)) {
                el.removeClass(disCls);
                el.addClass('disabled');
                var time = 60;
                var elTime = el.find("span");
                if (elTime.length == 0) {
                    el.html("<span>" + time + "</span>秒");
                    elTime = el.find("span");
                }
                var timer = setInterval(function () {
                    if (time > 1) {
                        var str = time - 1;
                        time = time - 1;
                        elTime.html(str);
                    } else {
                        str = "";
                        el.html(oldText);
                        el.addClass(disCls);
                        el.removeClass('disabled');
                        clearInterval(timer);
                    }

                }, 1000);
            }
        }
        //#endregion
    }
}])
app.factory('permissionsFactory',['$http','userServer','$window',function($http,userServer,$window){//权限处理工厂,判断是否登录
        return {
            isLogin:function(isLogin){
                if(isLogin)
                {
                    userServer.isLogin(function(data){
                        return data.code==1;
                    });
                }
                else{
                    return false;
                }
            }
        }
}])
app.factory('userInfoFactory',['$http','userServer','$window',function($http,userServer,$window){
    return {
        getUserInfo:userServer.getUserInfo(function(data) {
               if (data.code == 1 && data.data != null) {
                   return{
                       nick:(data.data.nick==null?"":data.data.nick),
                       mobile:(data.data.mobile==null?"":data.data.mobile)
                   }
                   //alert("s3"+data.data.mobile);
                   //userinfo.nick=data.data.nick==null?"":data.data.nick;
                   //userinfo.email=data.data.email==null?"":data.data.email;
                   //this.userinfo.mobile=data.data.mobile==null?"":data.data.mobile;
                   //alert(this.userinfo.mobile);
                   //userinfo.real_name=data.data.real_name==null?"":data.data.real_name;
                   //userinfo.brand_id=data.data.brand_id==null?"":data.data.brand_id;
                   //userinfo.brand_name=data.data.brand_name==null?"":data.data.brand_name;
                   //userinfo.carid=data.data.carid==null?"":data.data.carid;
                   //userinfo.gender=data.data.gender==null?"":data.data.gender;
                   //
                   //userinfo.sign=data.data.sign==null?"":data.data.sign;
                   //userinfo.head_pic_url=data.data.head_pic_url==null?"":data.data.head_pic_url;
                   //userinfo.points=data.data.points==null?"0":data.data.points;
                   //userinfo.frozenpoints=data.data.frozenpoints==null?"0":data.data.frozenpoints;
                   //userinfo.availpoints=data.data.availpoints==null?"0":data.data.availpoints;
                   //userinfo.type=data.data.type==null?"":data.data.type;
                   //userinfo.join_time=data.data.join_time==null?"":data.data.join_time;
                   //userinfo.popular=data.data.popular==null?"0":data.data.popular;
                   //userinfo.credibility=data.data.credibility==null?"0":data.data.credibility;
                   //alert("s3"+data.data.mobile);
               }
           })
    }
}])
