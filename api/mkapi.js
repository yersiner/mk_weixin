/**
  * config
  * @global variable
  */
const devMode = true;
const router = {
    login: {
        userLogin: 'loginModule/userLogin',
        captcha: 'loginModule/captchaImage'
    }
}

export default  {
     serverURI: '',
     getURL: (url) => {
         url = url.replace(/^\//, "");
         const [path, subPath] = url.match(/\w+/g);
         if(devMode) {
            webroot = "/test/";
            let devPath = url.replace(/\//g, "");
            return webroot + devPath + ".json";
         }
         return '/api/' + router[path][subPath]
     }

 };