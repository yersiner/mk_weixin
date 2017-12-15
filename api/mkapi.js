import axios from 'axios'
//import qs from 'qs'
//import NProgress from 'nprogress'

axios.interceptors.request.use(config => {
    //NProgress.start()
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus(response) {
    //NProgress.done()
    if (response.status === 200 || response.status === 304) {
        return response
    }
    return {
        data: {
            code: -404,
            message: response.statusText,
            data: response.statusText,
        }
    }
}

function checkCode(res) {
    if (res.data.code !== 200) {
        alert(res.data.message)
    }
    return res
}

export default {
    post(url, data) {
        return axios({
            method: 'post',
            url,
            data: data,
            timeout: 30000,
        }).then(checkStatus).then(checkCode)
    },
    get(url, params) {
        return axios({
            method: 'get',
            url,
            params,
            timeout: 30000,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(checkStatus).then(checkCode)
    }
}