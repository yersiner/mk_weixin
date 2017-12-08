var sha1 = require('sha1'),
    events = require('events'),
    path = require('path'),
    emitter = new events.EventEmitter(),
    xml2js = require('xml2js'),
    util = require('../util/util'),
    fs = require("fs"),
    https = require("https");
    formstream = require("formstream"),
request = require('request');

var config = require('../config/config');
var aotuConfig = config.wx_config.aotu;
var api = config.wx_config.aotu.tq;

var WeiXin = function() {
    this.data = '';
    this.msgType = 'text';
    this.fromUserName = '';
    this.toUserName = '';
    this.funcFlag = 0;
}

WeiXin.prototype.checkSignature = function(req) {
    this.signature = req.query.signature;
    this.timestamp = req.query.timestamp;
    this.nonce = req.query.nonce;
    this.echostr = req.query.echostr;
    console.log(this)
    var array = [aotuConfig.token, this.timestamp, this.nonce];
    array.sort();

    var str = sha1(array.join(""));
    return (str == this.signature)
}
/*组别1*/
WeiXin.prototype.textMsg = function(callback) {
    emitter.on('weixinTextMsg', callback);
}
WeiXin.prototype.parseTextMsg = function() {
    var msg = {
        "toUserName": this.data.ToUserName[0],
        "fromUserName": this.data.FromUserName[0],
        "createTime": this.data.CreateTime[0],
        "msgType": this.data.MsgType[0],
        "content": this.data.Content[0],
        "msgId": this.data.MsgId[0]
    };
    emitter.emit('weixinTextMsg', msg);
    return this;
}
/*组2*/
WeiXin.prototype.eventMsg = function(callback) {
    emitter.on('weixinEventMsg', callback);
    return this;
}
WeiXin.prototype.parseEventMsg = function() {
    var eventKey = '';
    if (this.data.EventKey) {
        eventKey = this.data.EventKey[0];
    }
    var msg = {
        "toUserName": this.data.ToUserName[0],
        "fromUserName": this.data.FromUserName[0],
        "createTime": this.data.CreateTime[0],
        "msgType": this.data.MsgType[0],
        "event": this.data.Event[0],
        "eventKey": eventKey
    }
    if (this.data.ScanCodeInfo) {
        msg.scanCodeInfo = this.data.ScanCodeInfo[0];
    }
    if (this.data.Latitude){
        msg.Latitude = this.data.Latitude[0];
    }
    if (this.data.Longitude){
        msg.Longitude = this.data.Longitude[0];
    }
    emitter.emit("weixinEventMsg", msg);
    return this;
}
/*组3*/
WeiXin.prototype.imageMsg = function(callback) {
    emitter.on('weixinImageMsg', callback);
}
WeiXin.prototype.parseImageMsg = function() {
    var msg = {
        "toUserName": this.data.ToUserName[0],
        "fromUserName": this.data.FromUserName[0],
        "createTime": this.data.CreateTime[0],
        "msgType": this.data.MsgType[0],
        "picUrl": this.data.PicUrl[0],
        "msgId": this.data.MsgId[0],
        "mediaId": this.data.MediaId[0]
    };
    emitter.emit('weixinImageMsg', msg);
    return this;
}
/*组4*/
WeiXin.prototype.voiceMsg = function(callback) {
    emitter.on('weixinVoiceMsg', callback);
}
WeiXin.prototype.parseVoiceMsg = function() {
    var msg = {
        "toUserName": this.data.ToUserName[0],
        "fromUserName": this.data.FromUserName[0],
        "createTime": this.data.CreateTime[0],
        "msgType": this.data.MsgType[0],
        "mediaId": this.data.MediaId[0],
        "format": this.data.Format[0],
        "msgId": this.data.MsgId[0],
    };
    emitter.emit('weixinVoiceMsg', msg);
    return this;
}

/*事件监听*/
WeiXin.prototype.sendTextMsg = function(msg) {
    var time = Math.round(new Date().getTime() / 1000);
    var funcFlag = msg.funcFlag ? msg.funcFlag : this.funcFlag;
    var output = "" +
        "<xml>" +
        "<ToUserName><![CDATA[" + msg.toUserName + "]]></ToUserName>" +
        "<FromUserName><![CDATA[" + msg.fromUserName + "]]></FromUserName>" +
        "<CreateTime>" + time + "</CreateTime>" +
        "<MsgType><![CDATA[" + msg.msgType + "]]></MsgType>" +
        "<Content><![CDATA[" + msg.content + "]]></Content>" +
        "<FuncFlag>" + funcFlag + "</FuncFlag>" +
        "</xml>";
    this.res.type('xml');
    this.res.send(output);
    return this;
}

WeiXin.prototype.sendNewsMsg = function(msg) {
    var time = Math.round(new Date().getTime() / 1000);
    var that = this;
    var blogsStr = '';
    for (var i = 0; i < msg.reqBlogs.length; i++) {
        var curBlog = msg.reqBlogs[i];
        blogsStr += "<item>" +
            "<Title><![CDATA[" + curBlog.title + "]]></Title>" +
            "<Description><![CDATA[" + curBlog.description + "]]></Description>" +
            "<PicUrl><![CDATA[" + curBlog.picUrl + "]]></PicUrl>" +
            "<Url><![CDATA[" + curBlog.url + "]]></Url>" +
            "</item>";
    }
    var funcFlag = msg.funcFlag ? msg.funcFlag : this.funcFlag;
    var output = "" +
        "<xml>" +
        "<ToUserName><![CDATA[" + msg.toUserName + "]]></ToUserName>" +
        "<FromUserName><![CDATA[" + msg.fromUserName + "]]></FromUserName>" +
        "<CreateTime>" + time + "</CreateTime>" +
        "<MsgType><![CDATA[" + msg.msgType + "]]></MsgType>" +
        "<ArticleCount>" + msg.reqBlogs.length + "</ArticleCount>" +
        "<Articles>" + blogsStr + "</Articles>" +
        "<FuncFlag>" + funcFlag + "</FuncFlag>" +
        "</xml>";
    that.res.type('xml');
    that.res.send(output);
    return this;
}

WeiXin.prototype.sendPicMsg = function(msg) {
    var time = Math.round(new Date().getTime() / 1000);
    var output = "" +
        "<xml>" +
        "<ToUserName><![CDATA[" + msg.toUserName + "]]></ToUserName>" +
        "<FromUserName><![CDATA[" + msg.fromUserName + "]]></FromUserName>" +
        "<CreateTime>" + time + "</CreateTime>" +
        "<MsgType><![CDATA[" + msg.msgType + "]]></MsgType>" +
        "<Image>" +
        "<MediaId><![CDATA[" + msg.mediaId + "]]></MediaId>" +
        "</Image>" +
        "</xml>";
    this.res.type('xml');
    this.res.send(output);
    return this;
}
WeiXin.prototype.sendVoiceMsg = function(msg) {
    var time = Math.round(new Date().getTime() / 1000);
    var output = "" +
        "<xml>" +
        "<ToUserName><![CDATA[" + msg.toUserName + "]]></ToUserName>" +
        "<FromUserName><![CDATA[" + msg.fromUserName + "]]></FromUserName>" +
        "<CreateTime>" + time + "</CreateTime>" +
        "<MsgType><![CDATA[" + msg.msgType + "]]></MsgType>" +
        "<Voice>"+
        "<MediaId><![CDATA[" + msg.mediaId + "]]></MediaId>" +
        "</Voice>"+
        "</xml>";
    this.res.type('xml');
    this.res.send(output);
    return this;
}
WeiXin.prototype.parse = function() {
    this.msgType = this.data.MsgType[0] ? this.data.MsgType[0] : 'text';
    switch (this.msgType) {
        case 'text':
            this.parseTextMsg();
            break;
        case 'event':
            this.parseEventMsg();
            break;
        case 'image':
            this.parseImageMsg();
            break;
        case 'voice':
            this.parseVoiceMsg();
            break;
    }
}


WeiXin.prototype.sendMsg = function(msg) {
    switch (msg.msgType) {
        case 'text':
            this.sendTextMsg(msg);
            break;
        case 'news':
            this.sendNewsMsg(msg);
            break;
        case 'image':
            this.sendPicMsg(msg);
            break;
        case 'voice':
            this.sendVoiceMsg(msg);
            break;
    }
}

//获取用户信息
WeiXin.prototype.getUserInfo = function(callback) {
    var self = this;
    util.getToken(aotuConfig, function(result) {
        if (result.err) {
            return callback({
                err: 1,
                msg: result.err
            });
        }
        var access_token = result.data.access_token;
        var url = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=' + access_token + '&openid=' + options.openId + '&lang=';
        if (options.lang) {
            url += options.lang;
        } else {
            url += 'zh_CN';
        }
        request.get({
            url: url
        }, function(error, httpResponse, body) {
            if (error) return callback({
                err: 1,
                msg: error
            });
            return callback({
                err: 0,
                msg: JSON.parse(body)
            });
        });
    });
}
//和微信建立长链接
WeiXin.prototype.loop = function(req, res) {
    this.res = res;
    var self = this;
    var buf = '';
    req.setEncoding('utf-8');
    req.on('data', function(chunk) {
        buf += chunk;
    });
    req.on('end', function() {
        xml2js.parseString(buf, function(err, json) {
            if (err) {
                err.status = 400;
            } else {
                req.body = json;
            }
        });
        self.data = req.body.xml;
        console.log(self.data);
        self.parse();
    });
}
//创建菜单
WeiXin.prototype.createMenu = function(callback){
    var self = this;
    util.getToken(aotuConfig,function(result){
        /*console.log(result);*/
        if(result.error){
            return callback({error:1,msg:result.msg});
        }
        var access_token = result.data.access_token;
        var url = "https://api.weixin.qq.com/cgi-bin/menu/create?access_token="+access_token;
        /*console.log(aotuConfig.menu);*/
        request({
            url:url,
            method:"post",
            body:aotuConfig.menu,
            json:true
        },function(error,httpResponse,body){
            if(error){
                return callback({error:true,msg:error});
            }
            return callback({error:false,msg:body});
        })

    });

}
//创建模板
WeiXin.prototype.createTemplate = function(msg,callback){
    var that = this;
    this.getHealthData(msg,function (data) {
       /* console.log(data);*/
        if (data) {
            var templateId = aotuConfig.template_id;
            var sendData = {
                "touser": msg.fromUserName,
                "template_id": templateId,
                "url": "https://weichat.newmicrotech.cn/phyDetail?user_id=" + data.user_id,
                "topColor": "#f17452",
                "data": {
                    "first": {
                        "value": "您" + that.getType(msg.type) + "的最近一次体格数据",
                        "color": "#f17452"
                    },
                    "keyword1": {
                        "value": "120mmHg" + "          " + "参考范围（80 ~ 120）",
                        "color": "#f17452"
                    },
                    "keyword2": {
                        "value": "80mmHg"+ "          " + "参考范围（80 ~ 120）",
                        "color": "#f17452"
                    },
                    "keyword3": {
                        "value": (data.heart==null?"无":data.heart.value) + "次/分"+"          " + "参考范围（60 ~ 100）",
                        "color": "#f17452"
                    },
                    "keyword4": {
                        "value": "您的血压为" + (data.heart==null?"无":data.heart.value) + "mmHg",
                        "color": "#f17452"
                    },
                    "remark": {
                        "value": new Date(that.getTime(data) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' '),
                        "color": "#403f44"
                    }
                }
            }
            util.getToken(aotuConfig,function(result){
                if(result.error){
                    return callback({
                        error : 1,
                        msg : result.msg
                    })
                }
                var access_token = result.data.access_token;
                var url = "https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=" + access_token;
                request({url:url,method:"post",body:sendData,json:true},function(error,httpResponse,body){
                    if(error){
                        this.res.send();
                    }else{
                        that.res.send();
                    }
                })
            });
        }else{
            callback({msg : "error"});
        }

    });

}
//请求数据
WeiXin.prototype.saveUser = function (data,callback) {
    request({url : api.saveUser,method:"POST",body:data,json:true},function (error,response,body) {
        if(error){
            callback(error)
        }else{
            callback(body);
        }
    })
}
//获取需要转发的用户数据信息
WeiXin.prototype.getOpenId = function (data,callback) {

    request({url : api.getOpenId,method : "POST",body:data,json:true},function (error,response,body) {
        if(error){
            callback(error)
        }else{
            callback(body);
        }
    })
};
//获取需要转发的用户数据信息
WeiXin.prototype.getUser = function (data,callback) {
    request({url : api.getUser,method : "POST",body:data,json:true},function (error,response,body) {
        if(error){
            callback(error)
        }else{
            callback(body);
        }
    })
}
//云信数据解析
WeiXin.prototype.parseUser = function (data,callback) {
    var that = this;
    if(data.eventType==1){
        var to = data.to;
        that.getOpenId({accId:to},function (msg) {
            callback(msg);
        });
    }
    //拼接数据，请求用户openId
}
//云信信息组装
 WeiXin.prototype.parseYX = function (resData,userData,callback) {
    var self = this;
    var type = resData.msgType;
    switch (type){
        case "PICTURE":
          var data = JSON.parse(resData.attach);
          var result = {};
            https.get(data.url, function(res){
                var imgData = "";
                res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
                res.on("data", function(chunk){
                    imgData+=chunk;
                });
                res.on("end", function(){
                    fs.writeFile(path.join(__dirname,'../temp/accept.'+data.ext), imgData, "binary", function(err){
                        if(err){
                            console.log("down fail");
                        }
                        var getMedia = {
                            type : "image",
                            url : path.join(__dirname,'../temp/accept.'+data.ext)
                        };
                        self.medialUpload(getMedia,function (id) {
                            id = JSON.parse(id);
                            if(id.media_id){
                                result = {
                                    "touser" : userData,
                                    "msgtype":"image",
                                    "image":{"media_id":id.media_id}
                                }
                            }else {
                                result={
                                    "touser": userData,
                                    "msgtype": "text",
                                    "text": {"content": "【来自云平台图片】,接收失败！！"}
                                }
                            }
                            callback(result);
                        });
                    });
                });
            });
            break;
        case "TEXT":
            callback ({
                "touser": userData,
                "msgtype": "text",
                "text": {"content": resData.body}
            });
            break;
        case "VOICE":
            callback({
                "touser": userData,
                "msgtype":"text",
                "text": {"content":"暂不支持语音发送"}});
            break;
        default:
            callback({
                "touser": userData,
                "msgtype":"text",
                "text": {"content":"只支持图片和文字的发送"}}) ;
            break;
    }

}
// 客服功能的使用
WeiXin.prototype.customer = function (data,callback) {
    var that = this;
    util.getToken(aotuConfig,function (result) {
        if (result.error){
             callback({
                error : 1,
                msg : result.msg
            })
        }else {
            request({url:api.customer + result.data.access_token,method:"post",body:data,json:true},function (error,response,body) {
                if(error){
                    callback(error);
                }else{
                    callback(body);
                }
            })
        }
    })
}
//下载上传的语音或者图片的信息
WeiXin.prototype.getMaterial = function (data,callback) {
    util.getToken(aotuConfig,function (result) {
        if(result.error){
            return callback({
                error : true,
                msg : result.msg
            });
        }else{
            var url = api.getMaterial + "access_token=" + result.data.access_token + "&media_id=" + data.media_id;
            request({url : url},function (error,response,body) {
                if(error){
                    callback(error);
                }else{
                    callback(body);
                }
            })
        }
    });
}
//新增临时素材
WeiXin.prototype.medialUpload= function (data,callback) {
    util.getToken(aotuConfig,function (result) {
        if(result.error){
            console.log("error token")
            return callback({
                error : true,
                msg : result.msg
            });
        }else{
            var url= 'https://api.weixin.qq.com/cgi-bin/media/upload?access_token='+result.data.access_token+'&type='+data.type;
            var sendImgUrl = (data.url).replace(/\\\\/g,"/");
            fs.stat(sendImgUrl,function(err,ret){
                if(err){
                    throw err;
                }else{
                    var form = formstream();
                    form.file('media',sendImgUrl,sendImgUrl,ret.size);
                    var upload = request.post(url,{headers:form.headers()},function(err,response,body){
                        if(err){
                            console.log(err)
                            callback({code:500,err:'失败'})
                            return;
                        }
                        fs.unlink(sendImgUrl);
                        callback(body);
                    });
                    form.pipe(upload);
                }
            });
        }
    })
}
//获取健康健康数据
WeiXin.prototype.getHealthData = function (data,callback) {
    var sendData = {openId : data.fromUserName,type:data.type}
    request({url : api.healthData,body:sendData,method:"post",json:true},function (error,response,body) {
        if (error){
            callback(false);
        }else{
            callback(body);
        }
    })
};
//类型判断
WeiXin.prototype.getType = function (data) {
    switch (data){
        case 0:return "自己";break;
        case 1:return  "爸爸";break;
        case 2:return "妈妈";break;
        default:return ;
    }
}
WeiXin.prototype.getTime = function (data) {
    if(!data.times){
        return "1"
    }else{
        return data.times.timed;
    }
}
WeiXin.prototype.getValue = function (data) {
    if(!data.heart){
        return "";
    }else{
        return data.heart.value;
    }
}
WeiXin.prototype.getRandomStr = function (len) {
    len = len||32;
    var _randomStr = "abcedfehijklmnopqrstuvwxyzABCDEHIJKLMNOPQRSTURWXYZ1234567890";
    var _length = _randomStr.length,str="";
    for(var i=0;i<len;i++){
        str +=_randomStr.charAt(Math.floor(Math.random()*_length));
    }
    return str;
}
module.exports = new WeiXin();
