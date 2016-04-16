$(document).on("pagebeforeshow", function () {
    $(this).find("#Footer a." + $.mobile.activeBtnClass).removeClass($.mobile.activeBtnClass);
    if ($.mobile.activePage) {
        $(this).find("#Footer a[data-active='" + $.mobile.activePage.attr('id').toLowerCase() + "']").addClass($.mobile.activeBtnClass);       
    }

    $(this).find(".j_TabNavs li").bind("tap", function (ev) {
        ev.preventDefault();
        var activeCls = "active", el = $(this);
        if (el.hasClass(activeCls)) {
            return;
        }
        el.siblings("." + activeCls).removeClass(activeCls);
        el.addClass(activeCls);
        var elTabContent = el.parents(".j_Tab").find(".j_TabContent");
        elTabContent.hide();
        var cIndex = el.parents(".j_Tab").find(".j_TabNavs li").index(el);
        elTabContent.eq(cIndex).show();
    });
});
//#region 数字转货币格式
var $To = {
    Money: function (str) {
        return parseFloat(str).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    },
    Num: function (str) {
        return Number(str.replace('。', '.').replace('￥', '').replace('¥', '').replace('，', '').replace(/,/g, ''));
    }
};
//#endregion
//#region 60秒倒计时
function $lastTime(el, disCls) {
    if (el.length < 1)
        return;
    var oldText = el.html();
    if (el.hasClass(disCls)) {
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
                el.removeClass(disCls);
                clearInterval(timer);
            }
            
        }, 1000);
    }
}
//#endregion

//#region 服务倒计时
var $Countdown = {
    ExpireTime: function (et) {
        if (et <= 0) {
            return "00：00：00";
        }
        var tDay = Math.floor(et / 86400000);
        et -= tDay * 86400000;
        tHour = Math.floor(et / 3600000);
        et -= tHour * 3600000;
        tHour = tHour + tDay * 24;
        if (tHour < 10) {
            tHour = "0" + tHour;
        }
        tMinute = Math.floor(et / 60000);
        et -= tMinute * 60000;
        if (tMinute < 10) {
            tMinute = "0" + tMinute;
        }
        tSecond = Math.floor(et / 1000);
        if (tSecond < 10) {
            tSecond = "0" + tSecond;
        }
        return tHour + "：" + tMinute + "：" + tSecond + "";
    },
    ShowTime: function (el,serverT) {
        var elTime = el;
        var endTime = (new Date(elTime.attr("data-end"))).getTime();
        var nowTime = serverT.getTime();
        var et = endTime - nowTime;
        var timer = setInterval(function () {
            elTime.html($Countdown.ExpireTime(et));
            if (et < 0) {
                clearInterval(timer);
            }
            et -= 1000;
        }, 1000);
    }
};
//#endregion