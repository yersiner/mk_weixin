/**
  * config
  * @global variable
  */
import axios from 'axios'

const devMode = true;

var gurl = encodeURIComponent(location.href.split("#")[0]);

const router = {
    api: {
        getAuth: '/api/getAuth',
        jssdk: '/api/jssdk?url=' + gurl
    },
    weichat: {
        getApplyStatus: '/weichat/getApplyStatus',
        bindHealthNum: '/weichat/bindHealthNum',
        getDoctorGuides: '/weichat/getDoctorGuides',
        getFamilyMembers: '/weichat/getFamilyMembers',
        getHospital: '/weichat/getHospital',
        applySign: '/weichat/applySign',
        dutyDoctorInfo: 'weichat/dutyDoctorInfo',
        getHealthFile: '/weichat/getHealthFile',
        getUserSignData: '/weichat/getUserSignData'
    }
}

function interceptorsMethod(store) {
    axios.interceptors.response.use(response => response, (error) => {
        store.dispatch('displayErrorLoad');
        console.log(error.response);
        Promise.resolve(error.response)
    })
}

function requestMethod(method, url, data = null) {
    if (!method) {
        console.error('API function call requires method argument')
        return
    }

    if (!url) {
        console.error('API function call requires url argument')
        return
    }
    if(devMode) {
        method = 'get';
        return new Promise((resolve, reject) => {
              setTimeout(() => {
                axios({
                    method,
                    url,
                    data,
                    timeout: 5000
                }).then((res) => {
                    resolve(res)
                })
              }, 1000)
        })
    }
    return axios({
              method,
              url,
              data,
              timeout: 3000
           })
}
export default  {
     serverURI: '',
     getURL: (url) => {
         url = url.replace(/^\//, "");
         const [path, subPath] = url.match(/\w+/g);
         if(devMode) {
            var webroot = "/testData/";
            let devPath = url.replace(/\//g, "");
            return webroot + devPath + ".json";
         }
         return router[path][subPath]
     },
     request:requestMethod,
     interceptors: interceptorsMethod

 };