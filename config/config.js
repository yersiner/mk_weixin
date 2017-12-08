module.exports = {
    wx_config: {
        aotu: {
            token: 'microtech123',
            appid: 'wx0d8e9309d7e36ca1',
            WXAdmin : "gh_724524df4446",
            secret: 'fc300d00f0c45b6eda740dcdfed6b152',
            template_id : "9xgaEDtMxperA9c-BXcloBIHd42xqa1-y3X6m2I8NPE",
            appKey : "07cf50a1f17a4849290ed2cbcf5aa26c",
            appSecret : "5d8389c5f877",
            cached: {},
            menu: {
                "button":[{
                    "type":"view",
                    "name":"体征数据",
                    "url":"https://weichat.newmicrotech.cn/phyDetail"
                },{
                    "name":"云病房",
                    "sub_button":[{
                        "type":"view",
                        "name":"家庭医生",
                        "url":"https://weichat.newmicrotech.cn/familyDoctor"
                    },{
                        "type":"view",
                        "name":"电子病历",
                        "url":"https://weichat.newmicrotech.cn/medicalRecords"
                    },{
                        "type":"view",
                        "name":"米可盒子",
                        "url":"https://weichat.newmicrotech.cn/mkBox"
                    },{
                        "type":"view",
                        "name":"健康指导",
                        "url":"https://weichat.newmicrotech.cn/guide"
                    }]
                },{
                    "name":"APP下载",
                    "type":"view",
                    "url":"https://weichat.newmicrotech.cn/download"
                }]
            },
            tq: {
                "saveUser": "https://doc.newmicrotech.cn/weichat/shut_note",//sceneId openId
                "getOpenId": "https://doc.newmicrotech.cn/weichat/weichart",//得到openId
                "getUser":  "https://doc.newmicrotech.cn/weichat/imAccount",//accid 云信 用于发送到微信
                'testUrl': 'https://doc.newmicrotech.cn/weichat/',
                'healthData': "https://doc.newmicrotech.cn/weichat/signsData",//openId type
                'customer': 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=',
                'getMaterial': 'http://file.api.weixin.qq.com/cgi-bin/media/get?',//access_token=ACCESS_TOKEN&media_id=MEDIA_ID   获取发送的语音地址
                'medialUpload':"https://api.weixin.qq.com/cgi-bin/media/upload?",//access_token=ACCESS_TOKEN&type=TYPE  新增临时素材
            }
        }
    }
}
