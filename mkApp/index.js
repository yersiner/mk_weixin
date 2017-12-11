import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import AppView from './components/App.vue'

Vue.use(VueRouter);

import routes from './routes'
import lodash from 'lodash';    

Object.defineProperty(Vue.prototype, '$lodash', { value: lodash });

import WechatAuth from './utils/auth';

// Routing logic
var router = new VueRouter({
  routes,
  linkActiveClass: "active"
});
console.log(7);
// 微信授权插件初始化
Vue.use(WechatAuth , {
  router, // 路由实例对象
  appid: 'wxe74b7801b2dcda3b', // 您的微信appid
  responseType: 'code',  // 返回类型，请填写code
  scope: 'snsapi_base', // 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
  getCodeCallback (code, next) {
    // 用户同意授权后回调方法
    // code：用户同意授权后，获得code值
    // code说明： code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
    // next： 无论access_token是否获取成功,一定要调用该方法
    // next说明：next方法接收两个参数
    // 参数1为通过code值请求后端获取到的access_token值，如果获取失败请填入空字符串''
    // 参数2(非必填，默认获取access_token切换到当前路由对象)，指定切换对象 next('/') 或者 next({ path: '/' })
    next();
    //axios.get('通过code值换取access_token接口地址', {
    //  params: {
    //    code,
    //    state: ''
    //  }
    //}).then(response => {
    //  let data = response.data
    //  let accessToken = data.data['access_token']
    //  if (accessToken) {
    //    next(accessToken) // 获取access_toeken成功
    //  } else {
    //    next() // 获取access_token失败
    //  }
    //}).catch(() => {
    //  next() // ajax出现错误
    //})
  }
})


new Vue({
  el: "#root",
  router: router,
  render: h => h(AppView)
})