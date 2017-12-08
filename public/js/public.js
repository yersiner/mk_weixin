//页面常用数据
var MicroDebug = true;
setCookie("openId","oTJAHv_Txa16PspKB-_r-B8c_-5c")
var microtech = function () {
    var baseUrl = "http://192.168.1.135:9999/weichat"; //测试url
    // var baseUrl = "https://doc.newmicrotech.cn/weichat" //正式服务器
    var appid = "wxe74b7801b2dcda3b";
    var api = {
        "usersInfo" : baseUrl + "/usersInfo", //获取用户的相关信息 电话/绑定医生/医生详情
        "usersBoxInfo":baseUrl + "/usersBoxInfo",
        "usersCases" : baseUrl + "/usersCases",//病例
        "usersBoxEdit":baseUrl + "/usersBoxEdit",
        "appDownload": baseUrl + "/appDownload",
        "bindBox" : baseUrl + "/bindBox",//绑定解绑盒子
        "login" : baseUrl + "/login",//非邀请关注绑定手机号码
        "signDoctor" : baseUrl + "/signDoctor", //签约医生
        "signsData" : baseUrl + "/signsData",//体征数据详情
    };
    return{
        baseUrl : baseUrl,
        api : api,
        appid : appid
    }
};
function ErrorRelaod() {
    $("body").empty();
    $("body").css({"height":"100%","width":"100%%","background":"url(/img/reload.png) center center no-repeat"});
    $("body").tap(function () {
        window.location.reload();
    });
}
//设置cookie
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//获取cookie
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
//类型判断
getType = function (data) {
    switch (data){
        case 0 :
            return "自己"; break;
        case 1 :
            return "父亲"; break;
        case 2 :
            return "母亲"; break;
        case 3 :
            return "爷爷"; break;
        case 4 :
            return "奶奶"; break;
        case 5 :
            return "外公"; break;
        case 6 :
            return "外婆"; break;
        case 7:
            return "儿子"; break;
        case 8 :
            return "女儿"; break;
        default :
            return "其他";
    }
}
//弹窗
var microtech_modal = {
    confirmOpen : function (text,callback) {
            var html = '<section class="deleteTip microtech_confirm">' +
                        '<div class="delete">' +
                        '<p>'+text+'</p>' +
                        '<div>' +
                        '<button class="isOk">确定</button>' +
                        '<button class="cancel">取消</button>' +
                        '</div>' +
                        '</div>' +
                    '</section>'
                    $('body').append(html);
                    $('body').on("click",'.isOk',function () {
                        callback(true);
                    })
                    $('body').on("click",'.cancel',function () {
                        callback(false);
                    })
    },
    confirmClose : function () {
        $(".microtech_confirm").remove();
    },
    toastOpen : function (text) {
        var html = '<div class="microtech_toast"> '+text+'</div>'
        $('body').append(html);
        setTimeout(function () {
            $(".microtech_toast").remove();
        },2000)
    },
    loadingOpen : function (text) {
        var html = '<div class="microtech_toast microtech_loading"> '+text+'<i class="dotting"></i></div>';
        $('body').append(html);
    },
    loaddingClose : function () {
        $(".microtech_loading").remove();
    },
    noData : function () {
        return '<div class="noData"><span><i>!</i>暂无数据</span><a href="/mkBox">快去绑定家庭成员</a></div>'
    }
}