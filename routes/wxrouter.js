var router = require('express').Router();
var weixin = require('../api/weixin');
var crypto = require("crypto");
var config = require('../config/config');
var path = require("path");
var fs = require("fs");
var https = require("http");
var aotuConfig = config.wx_config.aotu;

var serverAPI = require('../api/ServerAPI');
//var request = require("request");


//新建云信实体
var yx = new serverAPI(aotuConfig.appKey,aotuConfig.appSecret);
router.post("/microtechYX",function(req,res){
    weixin.parseUser(req.body,function (msg) {
        //console.log("parseUser:" +JSON.stringify(msg));
        if(msg.code==200){
            weixin.parseYX(req.body,msg.obj,function (data) {
                // console.log("parseYX:" +JSON.stringify(data));
                var result = weixin.customer(data);
                console.log(result)
            });
        }else{
            weixin.customer({
                "touser": msg.obj,
                "msgtype": "text",
                "text": {"content": '【未知消息】，解析失败'}
            })
        }
    })
    //抄送返回
    res.send();
});

//配置微信
router.get('/', function(req, res, next) {
    if (weixin.checkSignature(req)) {
        return res.status(200).send(req.query.echostr);
    }
    return res.render('index', {
        title:"网页授权"
    });
});
//与微信和云信建立长连接获取信息
router.post('/', function(req, res) {
    weixin.loop(req, res);
});
weixin.token = aotuConfig.token;
//发送语音
weixin.voiceMsg(function (msg) {
    var resMsg = {
        fromUserName: msg.toUserName,
        toUserName: msg.fromUserName,
        msgType: 'text',
        content: '暂不支持语音聊天',
        funcFlag: 0
    };
    weixin.sendMsg(resMsg);
})
/*//发送文字
* 通过用户发送过来的OPEN_ID去请求获取的他和医生的ACCID
* 在调用云信的方法发送
* */
weixin.textMsg(function (msg) {
    var resMsg = {
        fromUserName: msg.toUserName,
        toUserName: msg.fromUserName,
        msgType: 'text',
        content: '',
        funcFlag: 0
    };
    weixin.getUser({openId:msg.fromUserName},function (ret) {
        if(ret.code==200){
            ///console.log(ret)
            ret = ret.obj;
            var data = {
                from : ret.user_accId,
                ope : "0",
                type:"0",
                to:ret.doctor_accId,
                body : {msg : msg.content}
            }
            yx.sendMsg(data,function (err,data) {
                /*console.log("yx return ");
                console.log(data);*/
                if(err){
                    weixin.res.sendStatus(500);
                }else{
                    weixin.res.send();
                }
            })
        }else if(ret.code==509){
            resMsg.content = "<a href='https://weichat.newmicrotech.cn/#/apply/nice'>签约审批中，点击查看详情</a>";
            weixin.sendMsg(resMsg);
        }else if(ret.code==510){
            resMsg.content = "<a href='https://weichat.newmicrotech.cn/#/apply/nice'>审批不通过，点击查看详情</a>";
            weixin.sendMsg(resMsg);
        }else if(ret.code==500){
            resMsg.content = "服务器异常";
            weixin.sendMsg(resMsg);
        }else{
            resMsg.content = "<a href='https://weichat.newmicrotech.cn/#/combine/nice'>没有绑定档案编号，点击绑定档案编号</a>";
            weixin.sendMsg(resMsg);
        }
    });
});
/*//发送图片
* 获取的用户发过来的图片URL,经过MD5加密
* 在通过OPEN_ID获取双方的云信ACCID发送消息
* */
weixin.imageMsg(function (msg) {
    var resMsg = {
        fromUserName: msg.toUserName,
        toUserName: msg.fromUserName,
        msgType: 'text',
        content: '',
        funcFlag: 0
    };
    weixin.getUser({openId:msg.fromUserName},function (ret) {
        if(ret.code==200){
            ret = ret.obj;
            var getStr= weixin.getRandomStr(20);
            var host = "https://weichat.newmicrotech.cn";
            https.get(msg.picUrl,function (res) {
                var imgData = "";
                res.setEncoding("binary");
                res.on("data",function (chunk) {
                    imgData +=chunk;
                })
                res.on("end",function () {
                    fs.writeFile(path.join(__dirname,'../public/temp/'+getStr+".jpg"),imgData,'binary',function (err) {
                        if(err){
                            console.log("下载失败");
                        }else{
                            var dataScrete = crypto.createHash("md5");
                            var imgUrl = host+"/temp/"+getStr+".jpg";
                            dataScrete.update(imgUrl);
                            var md5 = dataScrete.digest("hex");
                            var data = {
                                from : ret.user_accId,
                                ope : "0",
                                type:"1",
                                to:ret.doctor_accId,
                                body : {url : imgUrl,md5:md5,ext:"jpg",h:1360,w:600,size:12800}
                            }
                            yx.sendMsg(data,function (err,data) {
                                if(err){
                                    weixin.res.send();
                                }else{
                                    weixin.res.send();
                                }
                            })
                        }
                    })
                })
            });
        }else if(ret.code==509){
            resMsg.content = "<a href='https://weichat.newmicrotech.cn/#/apply/nice'>签约审批中，点击查看详情</a>";
            weixin.sendMsg(resMsg);
        }else if(ret.code==510){
            resMsg.content = "<a href='https://weichat.newmicrotech.cn/#/apply/nice'>审批不通过，点击查看详情</a>";
            weixin.sendMsg(resMsg);
        }else if(ret.code==500){
            resMsg.content = "服务器异常";
            weixin.sendMsg(resMsg);
        }else{
            resMsg.content = "<a href='https://weichat.newmicrotech.cn/#/combine/nice'>没有绑定档案编号，点击绑定档案编号</a>";
            weixin.sendMsg(resMsg);
        }
    });
})
//处理事件
weixin.eventMsg(function(msg) {
    var resMsg = {
        fromUserName: msg.toUserName,
        toUserName: msg.fromUserName,
        msgType: 'text',
        content: '',
        funcFlag: 0
    };
    var recivedJson = {
        openId : msg.fromUserName,
        sceneId : msg.eventKey||""
    }
    var eventName = msg.event;
    if (eventName == 'subscribe') {
        //扫码登录
        console.log(msg.eventKey+"测试 sencen");
        //保存当前关注的用户
        weixin.saveUser(recivedJson,function (ret) {
            //console.log(ret)
            //显示欢迎信息
            if(ret.code==200){
                ret= ret.obj;
                if( ret.number_no===0){
                    var doctor_id = msg.eventKey.replace("qrscene_","");
                    //console.log(doctor_id)
                    resMsg.content = "欢迎您加入家庭健康管理平台，我们将竭诚为您服务。\n你的家庭医生是"+ret.gov_name+"医院的"+ret.name+"\n<a href='https://weichat.newmicrotech.cn/#/combine/"+doctor_id+"'>请获取您的健康档案 ></a>";
                    // console.log(resMsg.content);
                    weixin.sendMsg(resMsg);
                }else{
                    resMsg.content = '欢迎加入家庭健康管理平台，我们将竭诚为你服务:'+
                        "\n你的家庭医生是"+ret.gov_name+"医院的"+ret.name+"";
                    weixin.sendMsg(resMsg);
                }
            }else{
                resMsg.content = "欢迎您加入家庭健康管理平台，我们将竭诚为您服务。\n<a href='https://weichat.newmicrotech.cn/#/apply/nice'>请申请签约医生></a>";
                weixin.sendMsg(resMsg);
            }
        });
        /**
         * 对当前的信息类型做判断
         * @unsubscribe 关注
         * @evenKey  @self自己 @fathor父亲  @mather母亲
         * **/
    } else if (eventName == 'unsubscribe') {
        resMsg.content = '米可医疗希望再次为您服务！';
    } else if (msg.event == 'CLICK') {
        if (msg.eventKey == 'self') {
            var selfData = {fromUserName : msg.fromUserName,type:0}
            weixin.createTemplate(selfData,function(data){
                if(data.msg=="error"){
                    resMsg.content = "暂无健康数据!";
                    weixin.sendMsg(resMsg);
                }
            })
            //weixin.sendMsg(resMsg);
        } else if (msg.eventKey == 'father') {
            var fatherData = {fromUserName : msg.fromUserName,type:1}
            weixin.createTemplate(fatherData,function(data){
                if(data.msg=="error"){
                    resMsg.content = "暂无健康数据!";
                    weixin.sendMsg(resMsg);
                }
            })
            // weixin.sendMsg(resMsg);
        } else if (msg.eventKey == 'mather') {
            var matherData = {fromUserName : msg.fromUserName,type:2}
            weixin.createTemplate(matherData,function(data){
                if(data.msg=="error"){
                    resMsg.content = "暂无健康数据!";
                    weixin.sendMsg(resMsg);
                }
            })
            //weixin.sendMsg(resMsg);
        }
    }else if(msg.event=="VIEW"){

    }
});
//创建菜单
weixin.createMenu(function(result){
    //console.log(result)
});
/*
* 处理 比如文件、收藏、位置、等未知的信息
* */
weixin.OtherMsg(function (msg) {
    // console.log(msg)
    var resMsg = {
        fromUserName: msg.toUserName,
        toUserName: msg.fromUserName,
        msgType: 'text',
        content: '暂不支持此类型数据的发送',
        funcFlag: 0
    };
    weixin.sendMsg(resMsg);
})
module.exports = router;
