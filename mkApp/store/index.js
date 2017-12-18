import Api from '~/api/mkapi'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		isLoading: {
			load: false,
			text: '正在加载',
			errorText: '后端报错',
			success: false,
			error: false
		},
		openId: localStorage.getItem('access_token') || '',
		status: -10,
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
			phone: '',
			age: '',
			diseases:[],   //#病种:0=糖尿/1=高血/2=脑梗/3=其他[0,1,2,3]
	        sex:1,    //#性别 【-1:"未知"，1:"男"，2:"女"】
	        illness: "",      //# 现病情
	        always: "",       //# 既往史
	        personage: "",    //# 个人史
	        familys: ""      //# 家族史
		},
		DoctorInfo: {
			"name": "gyfnice",
	        "phone": "18732323232",
	        "avatar": "gyfnice",
	        "sex":1111,    //性别 【-1:"未知"，1:"男"，2:"女"】
	        "job_number":  "gyfnice",
	        "education":  "gyfnice",
	        "full_name":  "gyfnice",
	        "profile":  "gyfnice",
	        "visits_weeks":[]
		}
	},
	actions: {
		fetchDoctorInfo({commit, state, dispatch}) {
			return Api.request('post', Api.getURL('weichat/dutyDoctorInfo'), {
				openId: state.openId
			}).then((res)=> {
				commit('updateDoctorInfo', res.data.obj)
			}).catch(()=>{
				console.log('医生信息数据报错');
			})
		},
		fetchApplyStatus({commit, state, dispatch}) {
			if(state.status !== -10) {
				return new Promise((resolve, reject) => {
				      resolve({
				      	  data: {
				      	  	 obj: {
				      	  	 	status: state.status
				      	  	 }
				      	  }
				      })
			    })
			}
			//console.log('---status--->', state.status);
			return Api.request('post', Api.getURL('weichat/getApplyStatus'), {
				openId: state.openId
			})
		},
		bindHealthNum({commit, state}, info) {
			return Api.request('post', Api.getURL('weichat/bindHealthNum'), {
				openId: state.openId,
				healthNum: info
			})
		},
		fetchDoctorGuides({commit}, payload) {
			return Api.request('post', Api.getURL('weichat/getDoctorGuides'), {
			    userId:payload.user_id, //#成员id(其他地方为user_id)
			    pageIndex:payload.currentPage, //#当前页
			    pageSize:8 //#每页记录数
			})
		},
		fetchHealthRecord({commit}, payload) {
			commit('updateLoadingStatus', {isLoading: true, type: 'load', text: '正在提交'})
			return Api.request('post', Api.getURL('weichat/getHealthFile'), {
				userId: payload.user_id
			}).then((res) => {
  				commit('updateLoadingStatus', {isLoading: false, type: 'load', text: '正在提交'})
				commit('updateHealthRecord', res.data.obj);
			})
		},
		fetchMemberList({commit, state, dispatch}, info) {
			//获取家庭成员档案信息
			return Api.request('post', Api.getURL('weichat/getFamilyMembers'), {
				openId: state.openId,
			}).then((res)=> {
				console.log('加载家庭成员档案信息', res);
				commit('updateMemberList', res.data.obj);
				if(!info) {
					//查询该成员的随访信息
					return dispatch('fetchDoctorGuides', {
						user_id: state.selectMember.user_id,
						currentPage: 1
					}).then((res) => {
						console.log('成员的随访信息--->', res);
						commit('updateMemberInfoList', {
							current: false,
							...res.data.obj
						});
					})
				}else {
					//加载健康档案					
					return dispatch('fetchHealthRecord', {
						user_id: state.selectMember.user_id
					})
					//console.log(3333);
				}
			})

			//return new Promise((resolve, reject) => {
			//      setTimeout(() => {
			//      	console.log(888888888);
			//        //commit('someMutation')
			//        resolve()
			//      }, 1000)
		    //})
		},
		fetchHospitalList({commit, state}) {
			//获取医院列表信息
			if(state.status !== -1) {
				return;
			}
			return Api.request('post', Api.getURL('weichat/getHospital'), {
				region_id: ''
			}).then((res) => {
				commit('updateHostList', res.data.obj)
			})
		},
		submitApply({commit, dispatch}, data) {
      		commit('updateLoadingStatus', {isLoading: true, type: 'load', text: '正在提交'})

			return Api.request('post', Api.getURL('weichat/applySign'), data).then((res) => {
      			commit('updateLoadingStatus', {isLoading: false, type: 'load', text: '正在提交'})
				let data = res.data;
				if(data.code === 200) {
      				commit('updateStatus', {
      					status: data.obj.status || 1
      				})
				}else {
      				dispatch('displayErrorLoad');
      				commit('updateErrorText', '提交失败');
				}
			}).catch(() => {
				//dispatch('displayErrorLoad', {
				//	load: '正在提交',
				//	errorInfo: '提交失败'
				//});
				commit('updateErrorText', '提交失败')
				console.log('请求失败');
			})
		},
		fetchWxauth({commit}) {
			return Api.request('get', Api.getURL('api/jssdk'))
		},
		fetchOpenId({commit}, code) {
			return Api.request('post', Api.getURL('api/getAuth'), {
				code: code
			})
		},
		loadCaptcha() {
			//return api.request('get', config.getURL('login/captcha'))
		},
		displayErrorLoad({commit}, payload) {
			commit('updateLoadingStatus', {isLoading: false, type: 'load'})
			commit('updateLoadingStatus', {isLoading: true, type: 'error'})
			setTimeout(()=>{
				commit('updateLoadingStatus', {isLoading: false, type: 'error'})
			}, 800)
		}
	},
	mutations: {
		updateErrorText(state, payload) {
			state.isLoading.errorText = payload
		},
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
	    	state.MemberList.pData1 = []
	    	for(var item of list) {
	    		state.MemberList.pData1.push({
	    			text: item.name,
	    			value: item.user_id
	    		})
	    	}
	    	console.log('9------>', state.MemberList.pData1);
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
	    },
	    updateHealthRecord(state, payload) {
	    	state.selectMember = Object.assign({}, state.selectMember, payload)
	    },
	    updateDoctorInfo(state, payload) {
	    	state.DoctorInfo = Object.assign({}, state.DoctorInfo, payload)
	    }
	},
	getters: {
		
	}
})










