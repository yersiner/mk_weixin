import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
function request(method, url, data = null) {
	console.log(url, data);
	if (!method) {
		console.error('API function call requires method argument')
		return
	}

	if (!url) {
		console.error('API function call requires url argument')
		return
	}

	return axios({
		method,
		url,
		data
	})
}

export default new Vuex.Store({
	state: {
		isLoading: {
			load: false,
			text: '正在加载',
			success: false,
			error: false
		},
		openId: localStorage.getItem('access_token') || '',
		status: -1,
		HostList: {
			columns: 1,
			pData1: []
		},
		MemberList: []
	},
	actions: {
		fetchApplyStatus({commit, state, dispatch}) {
			return request('post', '/weichat/getApplyStatus', {
				openId: state.openId
			})
		},
		bindHealthNum({commit, state}, info) {
			return request('post', '/weichat/bindHealthNum', {
				openId: state.openId,
				healthNum: info
			})
		},
		fetchMemberList({commit}, info) {
			//获取家庭成员档案信息
			return new Promise((resolve, reject) => {
			      setTimeout(() => {
			      	console.log(888888888);
			        //commit('someMutation')
			        resolve()
			      }, 1000)
		    })
		},
		fetchHospitalList({commit}) {
			//获取医院列表信息
			return request('post', '/weichat/getHospital', {
				region_id: ''
			}).then((res) => {
				commit('updateHostList', res.data.obj)
			})
		},
		submitApply({commit}, data) {
      		commit('updateLoadingStatus', {isLoading: true, type: 'load', text: '正在提交'})

			return request('post', '/weichat/applySign', data).then((res) => {
      			commit('updateLoadingStatus', {isLoading: false, type: 'load', text: '正在提交'})
				let data = res.data;
				if(data.code === 200) {
      				commit('updateStatus', {
      					status: data.obj.status
      				})
				}
			}).catch(() => {
				console.log('请求失败');
			})
		},
		fetchOpenId({commit}, code) {
			return request('post', '/api/getAuth', {
				code: code
			})
		},
		loadCaptcha() {
			//return api.request('get', config.getURL('login/captcha'))
		}
	},
	mutations: {
		updateLoadingStatus (state, payload) {
			if(payload.type === 'load') {
	    		state.isLoading.load = payload.isLoading
			}else if(payload.type === 'success') {
	    		state.isLoading.success = payload.isLoading
			}else if(payload.type === 'error') {
	    		state.isLoading.error = payload.isLoading
			}
			state.isLoading.text = payload.text
	    },
	    updateHostList(state, payload) {
	    	var list = payload.list;
	    	console.log('hotlist---->', list);
	    	for (var item of list) {
	    	  state.HostList.pData1.push({
	    	  	 text: item.full_name,
	    	  	 value: item._id
	    	  })
	    	}
	    	console.log(state.HostList.pData1);
	    },
	    updateStatus(state, payload) {
	    	state.status = payload.status
	    },
	    updateOpenId(state, payload) {
	    	console.log(payload);
	    	state.openId = payload.openId;
	    }
	},
	getters: {
		
	}
})










