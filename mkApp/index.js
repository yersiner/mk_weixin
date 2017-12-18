import Vue from 'vue'
import VueRouter from 'vue-router'

import AppView from './components/App.vue'

Vue.use(VueRouter);

import routes from './routes'
import lodash from 'lodash';
import store from './store'

//import echarts from 'echarts'

//Object.defineProperty(Vue.prototype, '$lodash', { value: lodash });

import WechatAuth from './utils/auth';
import wxConfig from './utils/wx.config';

//import wx from './utils/weixin';

// Import Helpers for filters
import { prettyDate } from './filters'

// Import Install and register helper items
Vue.filter('prettyDate', prettyDate)


const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.use(require('vue-wechat-title'))

import Api from '~/api/mkapi'

Api.interceptors(store)
//require('./utils/weixin')

//require('es6-promise').polyfill()

// Routing logic
var router = new VueRouter({
  routes,
  linkActiveClass: "active"
});

//微信jssdk插件初始化
wxConfig.init(store)

// 微信授权插件初始化
Vue.use(WechatAuth , {
  router, // 路由实例对象
  store,
  appid: 'wx0d8e9309d7e36ca1', // 您的微信appid
  responseType: 'code',  // 返回类型，请填写code
  scope: 'snsapi_base', // 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
  getCodeCallback (code, next, path) {
    // 用户同意授权后回调方法
    // code：用户同意授权后，获得code值
    // code说明： code作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
    // next： 无论access_token是否获取成功,一定要调用该方法
    // next说明：next方法接收两个参数
    // 参数1为通过code值请求后端获取到的access_token值，如果获取失败请填入空字符串''
    // 参数2(非必填，默认获取access_token切换到当前路由对象)，指定切换对象 next('/') 或者 next({ path: '/' })

    
    store.dispatch('fetchOpenId', code).then((res) => {
        var openid = res.data.openid;
        store.commit('updateOpenId', {
          openId: openid
        })
        next(openid, {path: path});
    })

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

router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
      // 我们只关心之前没有渲染的组件
      // 所以我们对比它们，找出两个匹配列表的差异组件
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    if (!activated.length) {
      return next()
    }
    store.commit('updateLoadingStatus', {isLoading: true, type: 'load', text: '正在加载'})
    // 这里如果有加载指示器(loading indicator)，就触发
    Promise.all(activated.map(c => {
      if (c.asyncData) {
        return c.asyncData({
          store,
          route: to
        })
      }
    })).then(() => {
      console.log('加载成功');
      // 停止加载指示器(loading indicator)
      store.commit('updateLoadingStatus', {isLoading: false, type: 'load', text: '正在加载'})

      next()
    }).catch(next)
})


router.afterEach(routes => {
  if(typeof routes.meta.description !== undefined) {
      console.log('-->', routes.meta.description);
  }
})

new Vue({
  el: "#root",
  store,
  router: router,
  render: h => h(AppView)
})