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
		data,
		timeout: 5000
	})
}


var Mdata = [{
	doctorName:'gyfnice', //str #医生姓名
	desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque obcaecati earum in officia consequatur cumque molestiae, animi minus rerum ab. Sed veniam, molestias quidem voluptatem cum non pariatur. Similique, perferendis.',
	suggest:'yuyuyu', //#建议
	times:'1122121' //#时间
}, {
	doctorName:'gyfnice', //str #医生姓名
	desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque obcaecati earum in officia consequatur cumque molestiae, animi minus rerum ab. Sed veniam, molestias quidem voluptatem cum non pariatur. Similique, perferendis.',
	suggest:'yuyuyu', //#建议
	times:'1122121' //#时间
},{
	doctorName:'gyfnice', //str #医生姓名
	desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque obcaecati earum in officia consequatur cumque molestiae, animi minus rerum ab. Sed veniam, molestias quidem voluptatem cum non pariatur. Similique, perferendis.',
	suggest:'yuyuyu', //#建议
	times:'1122121' //#时间
},{
	doctorName:'gyfnice', //str #医生姓名
	desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque obcaecati earum in officia consequatur cumque molestiae, animi minus rerum ab. Sed veniam, molestias quidem voluptatem cum non pariatur. Similique, perferendis.',
	suggest:'yuyuyu', //#建议
	times:'1122121' //#时间
},{
	doctorName:'gyfnice', //str #医生姓名
	desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque obcaecati earum in officia consequatur cumque molestiae, animi minus rerum ab. Sed veniam, molestias quidem voluptatem cum non pariatur. Similique, perferendis.',
	suggest:'yuyuyu', //#建议
	times:'1122121' //#时间
}]

axios.interceptors.response.use(response => response, (error) => {
	console.log('数据加载出错');
	//alert('后端加载出错');
	Promise.resolve(error.response)
})


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
		MemberList: {
			columns: 1,
			pData1: []
		},
		MemberInfoList: [],
		selectMember: {
			name: '',
			user_id: '',
		}
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
		fetchDoctorGuides({commit}, payload) {
			return request('post', '/weichat/getDoctorGuides', {
			    userId:payload.user_id, //#成员id(其他地方为user_id)
			    pageIndex:payload.currentPage, //#当前页
			    pageSize:8 //#每页记录数
			})
		},
		fetchMemberList({commit, state, dispatch}, info) {
			//获取家庭成员档案信息
			return request('post', '/weichat/getFamilyMembers', {
				openId: state.openId,
			}).then((res)=> {
				console.log('加载家庭成员档案信息', res);
				commit('updateMemberList', res.data.obj);

				//查询该成员的随访信息
				dispatch('fetchDoctorGuides', {
					user_id: state.selectMember.user_id,
					currentPage: 1
				}).then((res) => {
					console.log('成员的随访信息--->', res);
					commit('updateMemberInfoList', {
						current: false,
						...res.data.obj
					});
				})
			})

			//return new Promise((resolve, reject) => {
			//      setTimeout(() => {
			//      	console.log(888888888);
			//        //commit('someMutation')
			//        resolve()
			//      }, 1000)
		    //})
		},
		fetchHospitalList({commit}) {
			//获取医院列表信息
			return request('post', '/weichat/getHospital', {
				region_id: ''
			}).then((res) => {
				commit('updateHostList', res.data.obj)
			})
		},
		submitApply({commit, dispatch}, data) {
      		commit('updateLoadingStatus', {isLoading: true, type: 'load', text: '正在提交'})

			return request('post', '/weichat/applySign', data).then((res) => {
      			commit('updateLoadingStatus', {isLoading: false, type: 'load', text: '正在提交'})
				let data = res.data;
				if(data.code === 200) {
      				commit('updateStatus', {
      					status: data.obj.status || 1
      				})
				}
			}).catch(() => {
				dispatch('displayErrorLoad', {
					load: '正在提交',
					errorInfo: '提交失败'
				});
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
		},
		displayErrorLoad({commit}, payload) {
			commit('updateLoadingStatus', {isLoading: false, type: 'load', text: payload.load})
			commit('updateLoadingStatus', {isLoading: true, type: 'error', text: payload.errorInfo})
			setTimeout(()=>{
				commit('updateLoadingStatus', {isLoading: false, type: 'error', text: payload.errorInfo})
			}, 800)
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
	    	//console.log(state.HostList.pData1);
	    },
	    updateStatus(state, payload) {
	    	state.status = payload.status
	    	//localStorage.setItem('status', payload.status)
	    },
	    updateOpenId(state, payload) {
	    	console.log(payload);
	    	state.openId = payload.openId;
	    },
	    updateMemberList(state, payload) {
	    	var list = payload.list
	    	for(var item of list) {
	    		state.MemberList.pData1.push({
	    			text: item.name,
	    			value: item.user_id
	    		})
	    	}
	    	state.selectMember.name = list[0].name;
	    	state.selectMember.user_id = list[0].user_id;
	    },
	    updateMemberInfoList(state, payload) {
	    	var list = payload.list;
	    	if(!payload.current) {
	    		console.log('clear list');
	    		state.MemberInfoList = [];
	    	}
	    	for(var item of list) {
	    		state.MemberInfoList.push(item)
	    	}
	    }
	},
	getters: {
		
	}
})










