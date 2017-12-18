/**
 * @file  微信JSSDK api注册
 * @author 龚一峰
 */
 const _shareDefault = {
    title: '蜂鸟健康',
    desc: '蜂鸟健康，健康一家人',
    link: location.href,
    imgUrl: 'http://spread.static.diditaxi.com.cn/bus/spread/static/static/img/logo_diditaxi_a918fd1.jpg'
}
export default  {
    init(store) {
        this.getToken(store)
        this.initShareMessage()
        this.initShareMessage()
    },
    initShareMessage() {
        wx.ready(function () {
            wx.onMenuShareAppMessage({
                title: _shareDefault.title, // 分享标题
                link: _shareDefault.link, // 分享链接
                imgUrl: _shareDefault.imgUrl, // 分享图标
                desc: _shareDefault.desc, // 分享描述
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    //options.callback && options.callback();
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });

        });
    },
    initShareTimeline() {
        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: _shareDefault.title, // 分享标题
                link: _shareDefault.link, // 分享链接
                imgUrl: _shareDefault.imgUrl, // 分享图标
                success: function () {
                    //options.callback && options.callback();
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
    },
    getToken(store) {
        store.dispatch('fetchWxauth').then((res => {
           var data = res.data;
           console.log('wxData--->', data);
           wx.config({
               debug : false,
               appId : data.appid,
               timestamp : data.timestamp,
               nonceStr : data.noncestr,
               signature : data.signature,
               jsApiList: [
                   'closeWindow',
                   'onMenuShareTimeline',
                   'onMenuShareAppMessage'
               ]
           });

           localStorage.setItem("wx_anticheat_data", {
               appId: data.appId, // 必填，公众号的唯一标识
               timestamp: data.timestamp, // 必填，生成签名的时间戳
               nonceStr: data.nonceStr, // 必填，生成签名的随机串
               signature: data.signature,// 必填，签名，见附录1
           });
        }))
    }
}