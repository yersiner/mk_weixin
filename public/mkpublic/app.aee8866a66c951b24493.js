webpackJsonp([6],{113:function(t,e,a){"use strict";var n=a(62),o=a(122),i=!1,s=function(t){i||(a(114),a(115))},r=a(25)(n.a,o.a,!1,s,null,null);r.options.__file="mkApp/components/App.vue",e.a=r.exports},114:function(t,e){},115:function(t,e){},119:function(t,e,a){"use strict";var n=a(63),o=a(121),i=!1,s=function(t){i||a(120)},r=a(25)(n.a,o.a,!1,s,"data-v-b408bb6a",null);r.options.__file="mkApp/widget/Loading.vue",e.a=r.exports},120:function(t,e){},121:function(t,e,a){"use strict";var n=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{class:this.load?"show":"hide",attrs:{id:"loadingToast"}},[e("div",{staticClass:"weui-mask_transparent"}),this._v(" "),e("div",{staticClass:"weui-toast"},[e("i",{staticClass:"weui-icon_toast",class:{"weui-loading":this.loading,"weui-icon-success-no-circle":this.success,"weui-icon-warn":this.error}}),this._v(" "),e("p",{staticClass:"weui-toast__content"},[this._v(this._s(this.text))])])])};n._withStripped=!0;var o={render:n,staticRenderFns:[]};e.a=o},122:function(t,e,a){"use strict";var n=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"App"}},[e("Loading",{attrs:{load:this.isLoading.load,loading:this.isLoading.load,text:this.isLoading.text}}),this._v(" "),e("Loading",{attrs:{load:this.isLoading.error,error:this.isLoading.error,text:this.isLoading.errorText}}),this._v(" "),e("Loading",{attrs:{load:this.isLoading.success,success:this.isLoading.success,text:this.isLoading.text}}),this._v(" "),e("transition",{attrs:{name:"fade",mode:"out-in"}},[e("router-view",{directives:[{name:"wechat-title",rawName:"v-wechat-title",value:this.$route.meta.title,expression:"$route.meta.title"}]})],1)],1)};n._withStripped=!0;var o={render:n,staticRenderFns:[]};e.a=o},123:function(t,e,a){"use strict";var n=[{path:"/apply/:doctorId",component:function(){return a.e(2).then(a.bind(null,169))},name:"apply",meta:{title:"申请签约家庭医生",auth:!0}},{path:"/doctorDetail",name:"doctorDetail",component:function(){return a.e(5).then(a.bind(null,172))},meta:{title:"医生详情",auth:!0}},{path:"/combine/:doctorId",name:"combine",component:function(){return a.e(4).then(a.bind(null,170))},meta:{title:"绑定健康档案",auth:!0}},{name:"memberlist",path:"/memberlist/:code",component:function(){return a.e(1).then(a.bind(null,171))},meta:{title:"康复指导",auth:!0}},{name:"healthGuide",path:"/healthGuide",component:function(){return a.e(3).then(a.bind(null,173))},meta:{title:"健康档案",auth:!0}},{name:"record",path:"/record",component:function(){return a.e(0).then(a.bind(null,174))},meta:{title:"个人体格数据",auth:!0}},{path:"/",name:"NotFoundView",component:a(124).a,meta:{title:"该页面无法显示",auth:!0}}];e.a=n},124:function(t,e,a){"use strict";var n=a(64),o=a(126),i=!1,s=function(t){i||a(125)},r=a(25)(n.a,o.a,!1,s,"data-v-4a86fca3",null);r.options.__file="mkApp/components/NotFoundView.vue",e.a=r.exports},125:function(t,e){},126:function(t,e,a){"use strict";var n=function(){var t=this.$createElement;this._self._c;return this._m(0)};n._withStripped=!0;var o={render:n,staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"notFond"},[e("h1",[this._v("暂未开放")])])}]};e.a=o},128:function(t,e,a){"use strict";var n=a(39),o=a.n(n),i=a(129),s=a.n(i),r=a(42),c=a.n(r),u=a(43),d=a.n(u),l=a(66),p=a(61),h=a(41);p.a.use(h.a),e.a=new h.a.Store({state:{isLoading:{load:!1,text:"正在加载",errorText:"后端报错",success:!1,error:!1},openId:localStorage.getItem("access_token")||"",status:-10,HostList:{columns:1,pData1:[]},MemberList:{columns:1,pData1:[]},MemberInfoList:[],selectMember:{name:"",user_id:"",phone:"",age:"",diseases:[],sex:1,illness:"",always:"",personage:"",familys:""},UserSignData:{xData:[],yData:{}},DoctorInfo:{name:"gyfnice",phone:"18732323232",avatar:"gyfnice",sex:1111,job_number:"gyfnice",education:"gyfnice",full_name:"gyfnice",profile:"gyfnice",visits_weeks:[]}},actions:{fetchDoctorInfo:function(t){var e=t.commit,a=t.state,n=t.dispatch;return l.a.request("post",l.a.getURL("weichat/dutyDoctorInfo"),{openId:a.openId}).then(function(t){if(200!==t.data.code)return n("displayErrorLoad"),void e("updateErrorText",t.data.msg);e("updateDoctorInfo",t.data.obj)}).catch(function(){console.log("医生信息数据报错")})},fetchApplyStatus:function(t){t.commit;var e=t.state;t.dispatch;return-10!==e.status?new d.a(function(t,a){t({data:{obj:{status:e.status}}})}):l.a.request("post",l.a.getURL("weichat/getApplyStatus"),{openId:e.openId})},bindHealthNum:function(t,e){t.commit;var a=t.state;return l.a.request("post",l.a.getURL("weichat/bindHealthNum"),{openId:a.openId,healthNum:e.healthCode,doctorId:e.doctorId})},fetchDoctorGuides:function(t,e){t.commit;return l.a.request("post",l.a.getURL("weichat/getDoctorGuides"),{userId:e.user_id,pageIndex:e.currentPage,pageSize:8})},fetchUserSignData:function(t,e){var a=t.commit;return a("updateLoadingStatus",{isLoading:!0,type:"load",text:"正在加载"}),l.a.request("post",l.a.getURL("weichat/getUserSignData"),{userId:e.user_id}).then(function(t){a("updateLoadingStatus",{isLoading:!1,type:"load",text:"正在加载"}),a("updateUserSignData",t.data.obj)})},fetchHealthRecord:function(t,e){var a=t.commit;return a("updateLoadingStatus",{isLoading:!0,type:"load",text:"正在加载"}),l.a.request("post",l.a.getURL("weichat/getHealthFile"),{userId:e.user_id}).then(function(t){a("updateLoadingStatus",{isLoading:!1,type:"load",text:"正在加载"}),a("updateHealthRecord",t.data.obj)})},fetchMemberList:function(t,e){var a=t.commit,n=t.state,o=t.dispatch;return l.a.request("post",l.a.getURL("weichat/getFamilyMembers"),{openId:n.openId}).then(function(t){return console.log("加载家庭成员档案信息",t),a("updateMemberList",t.data.obj),"guide"===e.name?o("fetchDoctorGuides",{user_id:n.selectMember.user_id,currentPage:1}).then(function(t){console.log("成员的随访信息---\x3e",t),a("updateMemberInfoList",c()({current:!1},t.data.obj))}):"health"===e.name?o("fetchHealthRecord",{user_id:n.selectMember.user_id}):"record"===e.name?o("fetchUserSignData",{user_id:n.selectMember.user_id}):void 0})},fetchHospitalList:function(t){var e=t.commit,a=t.state;if(-1===a.status||-10===a.status)return l.a.request("post",l.a.getURL("weichat/getHospital"),{region_id:""}).then(function(t){e("updateHostList",t.data.obj)}).catch(function(t){e("updateErrorText","加载医院列表失败")})},submitApply:function(t,e){var a=t.commit,n=t.dispatch;return a("updateLoadingStatus",{isLoading:!0,type:"load",text:"正在提交"}),l.a.request("post",l.a.getURL("weichat/applySign"),e).then(function(t){a("updateLoadingStatus",{isLoading:!1,type:"load",text:"正在提交"});var e=t.data;200===e.code?a("updateStatus",{status:e.obj.status||1}):(n("displayErrorLoad"),a("updateErrorText","提交失败"))}).catch(function(){a("updateErrorText","提交失败"),console.log("请求失败")})},fetchWxauth:function(t){t.commit;return l.a.request("get",l.a.getURL("api/jssdk"))},fetchOpenId:function(t,e){t.commit;return l.a.request("post",l.a.getURL("api/getAuth"),{code:e})},loadCaptcha:function(){},displayErrorLoad:function(t,e){var a=t.commit;a("updateLoadingStatus",{isLoading:!1,type:"load"}),a("updateLoadingStatus",{isLoading:!0,type:"error"}),setTimeout(function(){a("updateLoadingStatus",{isLoading:!1,type:"error"})},1800)}},mutations:{updateErrorText:function(t,e){t.isLoading.errorText=e},updateLoadingStatus:function(t,e){"load"===e.type?t.isLoading.load=e.isLoading:"success"===e.type?t.isLoading.success=e.isLoading:"error"===e.type&&(t.isLoading.error=e.isLoading),t.isLoading.text=e.text},updateHostList:function(t,e){var a=e.list;console.log("hotlist----\x3e",a);var n=!0,o=!1,i=void 0;try{for(var r,c=s()(a);!(n=(r=c.next()).done);n=!0){var u=r.value;t.HostList.pData1.push({text:u.full_name,value:u._id})}}catch(t){o=!0,i=t}finally{try{!n&&c.return&&c.return()}finally{if(o)throw i}}},updateStatus:function(t,e){t.status=e.status},updateOpenId:function(t,e){console.log(e),t.openId=e.openId},updateMemberList:function(t,e){var a=e.list;t.MemberList.pData1=[];var n=!0,o=!1,i=void 0;try{for(var r,c=s()(a);!(n=(r=c.next()).done);n=!0){var u=r.value;t.MemberList.pData1.push({text:u.name,value:u.user_id})}}catch(t){o=!0,i=t}finally{try{!n&&c.return&&c.return()}finally{if(o)throw i}}console.log("9------\x3e",t.MemberList.pData1,t.selectMember),t.selectMember.name=a[0].name,t.selectMember.user_id=a[0].user_id},updateMemberInfoList:function(t,e){var a=e.list;e.current||(console.log("clear list"),t.MemberInfoList=[]);var n=!0,o=!1,i=void 0;try{for(var r,c=s()(a);!(n=(r=c.next()).done);n=!0){var u=r.value;t.MemberInfoList.push(u)}}catch(t){o=!0,i=t}finally{try{!n&&c.return&&c.return()}finally{if(o)throw i}}},updateUserSignData:function(t,e){t.UserSignData=o()({},t.UserSignData,e);var a=e.data.map(function(t){return t.day.slice(8)+"日"});p.a.set(t.UserSignData,"xData",a);var n={heart:e.data.map(function(t){return t.heart.value}),oxygen:e.data.map(function(t){return t.oxygen.value}),dia_value:e.data.map(function(t){return t.pressure.dia_value}),sys_value:e.data.map(function(t){return t.pressure.sys_value}),sugar:e.data.map(function(t){return t.sugar.value})};p.a.set(t.UserSignData,"yData",n),console.log("UserSignData--\x3e",t.UserSignData)},updateHealthRecord:function(t,e){t.selectMember=o()({},t.selectMember,e)},updateDoctorInfo:function(t,e){t.DoctorInfo=o()({},t.DoctorInfo,e)}},getters:{}})},151:function(t,e,a){"use strict";var n=a(152),o=a(158),i=a.n(o),s=a(72),r=a.n(s);e.a={install:function(t,e){function a(t,e,a){var n=r.a.parse(i.a.parse(window.location.href).query).code;if(function(t){t&&(o.setAuthCode(t),o.removeUrlCodeQuery())}(n),!n&&!function(t,e,a){var n=o.getAuthCode();return!((t.meta&&t.meta.auth||n)&&(n||o.getAccessToken()?n&&!o.getAccessToken()&&(o.getCodeCallback(a),1):(o.openAuthPage(window.location.href),1)))}(t,0,a))return!1;c.dispatch("fetchApplyStatus").then(function(e){var n=e.data.obj.status;console.log("获取签约的状态-gyf",n),c.commit("updateStatus",{status:n}),"apply"===t.name||"combine"===t.name||-1!==n&&1!==n&&3!==n?"apply"!==t.name&&"combine"!==t.name||2!==n?a():a({path:"/doctorDetail"}):a({path:"/apply/nice"})}).catch(function(){a(),console.log("加载签约信息失败")})}console.log(e);var o=new n.a(e),s=e.router,c=e.store;if(!s)return!1;s.beforeEach(function(t,e,n){a(t,0,n)})}}},152:function(t,e,a){"use strict";var n=a(39),o=a.n(n),i=a(153),s=a.n(i),r=a(154),c=a.n(r),u=function(){function t(e){s()(this,t);this.config=o()({appid:"",responseType:"code",scope:"snsapi_base ",getCodeCallback:function(){}},e)}return c()(t,[{key:"openAuthPage",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.location.href,e=t.split("#");window.sessionStorage.setItem("redirect_path",e[1]),t=encodeURIComponent(e[0]),this.removeAccessToken(),this.removeAuthCode();var a="?appid="+this.config.appid+"&redirect_uri="+t+"&response_type="+this.config.responseType+"&scope="+this.config.scope+"#wechat_redirect";window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize"+a}},{key:"setAuthCode",value:function(t){return!!t&&(window.sessionStorage.setItem("auth_code",t),!0)}},{key:"getAuthCode",value:function(){var t=window.sessionStorage.getItem("auth_code");return t||""}},{key:"removeAuthCode",value:function(){window.sessionStorage.removeItem("auth_code")}},{key:"removeUrlCodeQuery",value:function(){var t=window.location,e=t.search;e&&(e=e.substr(1));var a=t.origin,n=t.pathname;n&&(a+=n);var o=e.split("&").filter(function(t){return-1===t.indexOf("code=")&&-1===t.indexOf("state=")});o.length>0&&(a+="?"+o.join("&"));var i=t.hash;i&&(a+=i),window.location.href=a}},{key:"setAccessToken",value:function(t){return!!t&&(window.localStorage.setItem("access_token",t),!0)}},{key:"getAccessToken",value:function(){return window.localStorage.getItem("access_token")}},{key:"removeAccessToken",value:function(){window.localStorage.removeItem("access_token")}},{key:"next",value:function(t){var e=this;return function(a,n){a?(e.setAccessToken(a),n?t(n):t()):(e.removeAccessToken(),n&&t(n)),e.removeAuthCode()}}},{key:"getCodeCallback",value:function(t){return this.config.getCodeCallback(this.getAuthCode(),this.next(t),window.sessionStorage.getItem("redirect_path"))}}]),t}();e.a=u},163:function(t,e,a){"use strict";var n={title:"蜂鸟健康",desc:"蜂鸟健康，健康一家人",link:location.href,imgUrl:"http://spread.static.diditaxi.com.cn/bus/spread/static/static/img/logo_diditaxi_a918fd1.jpg"};e.a={init:function(t){this.getToken(t),this.initShareMessage(),this.initShareMessage()},initShareMessage:function(){wx.ready(function(){wx.onMenuShareAppMessage({title:n.title,link:n.link,imgUrl:n.imgUrl,desc:n.desc,type:"",dataUrl:"",success:function(){},cancel:function(){}})})},initShareTimeline:function(){wx.ready(function(){wx.onMenuShareTimeline({title:n.title,link:n.link,imgUrl:n.imgUrl,success:function(){},cancel:function(){}})})},getToken:function(t){t.dispatch("fetchWxauth").then(function(t){var e=t.data;console.log("wxData---\x3e",e),wx.config({debug:!1,appId:e.appid,timestamp:e.timestamp,nonceStr:e.noncestr,signature:e.signature,jsApiList:["closeWindow","onMenuShareTimeline","onMenuShareAppMessage"]}),localStorage.setItem("wx_anticheat_data",{appId:e.appId,timestamp:e.timestamp,nonceStr:e.nonceStr,signature:e.signature})}).catch(function(e){t.commit("updateErrorText","jssdk出错")})}}},164:function(t,e,a){"use strict";e.b=function(t){var e=(t=new Date(1e3*(0|t))).getFullYear(),a=t.getMonth()+1,n=t.getDate(),o=t.getHours(),i=t.getMinutes(),s=t.getSeconds();return a=a<10?"0"+a:a,n=n<10?"0"+n:n,o=o<10?"0"+o:o,i=i<10?"0"+i:i,s=s<10?"0"+s:s,t=e+"/"+a+"/"+n+" "+o+":"+i},e.a=function(t){(t=new Date(1e3*(0|t))).getFullYear();var e=t.getMonth()+1,a=t.getDate(),n=t.getHours(),o=t.getMinutes(),i=t.getSeconds();return e=e<10?"0"+e:e,a=a<10?"0"+a:a,n=n<10?"0"+n:n,o=o<10?"0"+o:o,i=i<10?"0"+i:i,t=n+":"+o};document.createElement("a")},168:function(t,e){},62:function(t,e,a){"use strict";var n=a(42),o=a.n(n),i=a(119),s=a(41);e.a={name:"App",components:{Loading:i.a},computed:o()({},Object(s.b)({isLoading:function(t){return t.isLoading}})),data:function(){return{section:"test section"}}}},63:function(t,e,a){"use strict";e.a={name:"Loading",props:{load:{type:Boolean,default:!1},loading:{type:Boolean,default:!1},success:{type:Boolean,default:!1},error:{type:Boolean,default:!1},text:{type:String,default:""}},data:function(){return{section:"test Found"}}}},64:function(t,e,a){"use strict";e.a={name:"NotFound",data:function(){return{section:"test Found"}}}},66:function(t,e,a){"use strict";var n=a(132),o=a.n(n);const i=!1;const s={api:{getAuth:"/api/getAuth",jssdk:"/api/jssdk?url="+encodeURIComponent(location.href.split("#")[0])},weichat:{getApplyStatus:"/weichat/getApplyStatus",bindHealthNum:"/weichat/bindHealthNum",getDoctorGuides:"/weichat/getDoctorGuides",getFamilyMembers:"/weichat/getFamilyMembers",getHospital:"/weichat/getHospital",applySign:"/weichat/applySign",dutyDoctorInfo:"weichat/dutyDoctorInfo",getHealthFile:"/weichat/getHealthFile",getUserSignData:"/weichat/getUserSignData"}};e.a={serverURI:"",getURL:t=>{t=t.replace(/^\//,"");const[e,a]=t.match(/\w+/g);if(i&&"api"!==e){return"/testData/"+t.replace(/\//g,"")+".json"}return s[e][a]},request:function(t,e,a=null){if(!t)return void console.error("API function call requires method argument");if(!e)return void console.error("API function call requires url argument");const[n,s]=e.match(/\w+/g);return i&&"api"!==n?(t="get",new Promise((n,i)=>{setTimeout(()=>{o()({method:t,url:e,data:a,timeout:5e3}).then(t=>{n(t)})},1e3)})):o()({method:t,url:e,data:a,timeout:3e3})},interceptors:function(t){o.a.interceptors.response.use(e=>(~e.request.responseURL.indexOf("api")||200===e.data.code||(t.dispatch("displayErrorLoad"),t.commit("updateErrorText",e.data.msg)),e),e=>{t.dispatch("displayErrorLoad"),console.log(e.response),Promise.resolve(e.response)}),o.a.interceptors.request.use(e=>(t.commit("updateLoadingStatus",{isLoading:!0,type:"load",text:"正在加载"}),e),e=>{t.dispatch("displayErrorLoad"),console.log(e),Promise.reject(e)})}}},73:function(t,e,a){t.exports=a(74)},74:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(75),o=a.n(n),i=a(43),s=a.n(i),r=a(61),c=a(112),u=a(113),d=a(123),l=a(127),p=(a.n(l),a(128)),h=a(151),f=a(163),g=a(164),m=a(66);r.a.use(c.a),r.a.filter("prettyDate",g.b),r.a.filter("minSecond",g.a);a(165).attach(document.body),r.a.use(a(166)),m.a.interceptors(p.a),a(167).polyfill();var v=new c.a({routes:d.a,linkActiveClass:"active"});f.a.init(p.a),r.a.use(h.a,{router:v,store:p.a,appid:"wx0d8e9309d7e36ca1",responseType:"code",scope:"snsapi_base",getCodeCallback:function(t,e,a){p.a.dispatch("fetchOpenId",t).then(function(t){var n=t.data.openid;p.a.commit("updateOpenId",{openId:n}),e(n,{path:a})}).catch(function(){console.log("openid error")})}}),v.beforeResolve(function(t,e,a){var n=v.getMatchedComponents(t),o=v.getMatchedComponents(e),i=!1,r=n.filter(function(t,e){return i||(i=o[e]!==t)});if(!r.length)return a();p.a.commit("updateLoadingStatus",{isLoading:!0,type:"load",text:"正在加载"}),s.a.all(r.map(function(e){if(e.asyncData)return e.asyncData({store:p.a,route:t})})).then(function(){console.log("加载成功"),p.a.commit("updateLoadingStatus",{isLoading:!1,type:"load",text:"正在加载"}),a()}).catch(a)}),v.afterEach(function(t){void 0!==o()(t.meta.description)&&console.log("--\x3e",t.meta.description)}),new r.a({el:"#root",store:p.a,router:v,render:function(t){return t(u.a)}})}},[73]);