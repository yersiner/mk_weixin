/**
 * ------------------------------------------------------------------
 * 微信授权主入口文件
 * @author gyfnice
 * @date 2017/12/11
 * ------------------------------------------------------------------
 */

import WeChatAuth from './wechat-auth'
import url from 'url'
import querystring from 'querystring'


//const setWechatTitle = function(title) {
//    document.title = title;
//    let mobile = navigator.userAgent.toLowerCase();
//    if (/iphone|ipad|ipod/.test(mobile)) {
//        let iframe = document.createElement('iframe');
//        iframe.style.visibility = 'hidden';
//        // 替换成站标favicon路径或者任意存在的较小的图片即可
//        iframe.setAttribute('src', '//m.baidu.com/favicon.ico');
//        let iframeCallback = function() {
//            setTimeout(function() {
//                iframe.removeEventListener('load', iframeCallback)
//                document.body.removeChild(iframe)
//            }, 10)
//        };
//        iframe.addEventListener('load', iframeCallback)
//        document.body.appendChild(iframe)
//    }
//};

export default {
  install (Vue, options) {
    console.log(options);
    let weChatAuth = new WeChatAuth(options)
    let router = options.router
    let store = options.store
    if (!router) return false

    function urlCodeQueryFilter (code) {
      if (code) {
        weChatAuth.setAuthCode(code)
        weChatAuth.removeUrlCodeQuery()
      }
    }

    function checkRouterAuth (to, from, next) {
      let authCode = weChatAuth.getAuthCode()
      if ((!to.meta || !to.meta.auth) && !authCode) return true
      if (!authCode && !weChatAuth.getAccessToken()) {
        weChatAuth.openAuthPage(window.location.href)
        return false
      } else if (authCode && !weChatAuth.getAccessToken()) {
        weChatAuth.getCodeCallback(next)
        return false
      }
      return true
    }

    function beforeEach (to, from, next) {
      let query = querystring.parse(url.parse(window.location.href).query)
      let code = query.code
      urlCodeQueryFilter(code)
      //setWechatTitle(to.meta.description);
      if (!code && !checkRouterAuth(to, from, next)) {
        return false
      }
      next();
    }

    router.beforeEach((to, from, next) => {
      beforeEach(to, from, next)
    })
  }
}