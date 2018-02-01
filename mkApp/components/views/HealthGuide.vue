<template>
		<section class="medicalBox" style="">
			<div class="medicalTop"></div>
			<div class="medicalContent">
				<div class="contentTitle">
					<h2 @click="toggleTitle()"><span>{{selectMember.name }}</span><img src="../../../public/img/arrow_icon_white.png"/></h2>
					<p>
						<span>{{sexMap[selectMember.sex]}}</span>
						<span>{{selectMember.age}}岁</span>
						<span>{{selectMember.phone}}</span>
					</p>
					<div class="decoration">
						<img src="../../../public/img/rot.png"/>
						<img src="../../../public/img/rot.png"/>
					</div>
				</div>
				<div class="contentText">
					<div class="itemText">
						<div class="tabNav" @click="toggleA()">
							<span>现病情</span><img src="../../../public/img/arrow_icon.png"/>
						</div>
						<p :class=" Aflag ? 'spread' : '' " id="illness">{{selectMember.illness}}</p>
					</div>
					<div class="itemText">
						<div class="tabNav" @click="toggleB()">
							<span>即往史</span><img src="../../../public/img/arrow_icon.png"/>
						</div>
						<p :class=" Bflag ? 'spread' : '' " id="always">{{selectMember.always}}</p>
					</div>
					<div class="itemText">
						<div class="tabNav" @click="toggleC()">
							<span>个人史</span><img src="../../../public/img/arrow_icon.png"/>
						</div>
						<p :class=" Cflag ? 'spread' : '' " id="familys">{{selectMember.personage}}</p>
					</div>
					<div class="itemText dialogue">
						<div class="tabNav" @click="toggleD()">
							<span>家族史</span><img src="../../../public/img/arrow_icon.png"/>
						</div>
						<p :class=" Dflag ? 'spread' : '' " id="record_des">{{selectMember.familys}}</p>
					</div>
					<!--底部翻页特效-->
					<img src="../../../public/img/bookmark.png"/>
				</div>
			</div>
	<!--弹出框-->
			<div class="markDrop">
				<div class="weui-mask" @click="toggleTitle()" id="iosMask" :class=" showFlag ? 'weui-animate-fade-in' : 'weui-animate-fade-out hide'"></div>
				<div class="dropContent weui-actionsheet" :class=" showFlag ? 'weui-actionsheet_toggle' : '' ">
					<div @click="getMember(index)" class="selectItem" :key="index" v-for="(member, index) in MemberList.pData1">
						<p>{{member.text}}</p>
					</div>
					<div @click="cancel()" class="selectItem" data-type="999">
						<p>取消</p>
					</div>
				</div>
			</div>
		</section>
</template>

<script>
  	import { mapState } from 'vuex'

	export default {
	  name: "HealthGuide",
	  methods: {
	  	cancel() {
	  		this.toggleTitle()
	  	},
	  	toggleA(){
	  		this.Aflag = !this.Aflag
	  	},
	  	toggleB(){
	  		this.Bflag = !this.Bflag
	  	},
	  	toggleC(){
	  		this.Cflag = !this.Cflag
	  	},
	  	toggleD(){
	  		this.Dflag = !this.Dflag
	  	},
	  	toggleTitle() {
	  		this.showFlag = !this.showFlag;
	  	},
	  	getMember(index) {
	  		this.selectMember.name = this.MemberList.pData1[index].text
	  		this.selectMember.user_id = this.MemberList.pData1[index].value
	  		this.$store.dispatch('fetchHealthRecord', {
				user_id: this.selectMember.user_id
			})
	  		this.toggleTitle()
	  	}
	  },
	  asyncData({store, route}) {
	    var me = this;
	    return store.dispatch('fetchMemberList', {
	    	name: 'health'
	    }).catch((t)=>{
	       //me.selectMember = me.MemberList.pData1[0].name
	       //debugger;
	       //store.dispatch('fetchDoctorGuides') //查询该成员的随访信息
	       console.log('error---', t);
	    })
	  },
	  computed: {
	     ...mapState([
	       // map this.count to store.state.count
	       'MemberList',
	       'selectMember',
	       'openId'
	     ])
	  },
	  data() {
	    return {
	      showFlag: false,
	      section: 'test Bar',
	      sexMap: {
	      	"-1":"未知",
	      	1:"男",
	      	2:"女"
	      },
	      Aflag: false,
	      Bflag: false,
	      Cflag: false,
	      Dflag: false
	    }
	  }
	}
</script>
<style scoped>
	ul,li{
		list-style: none;
	}
	.spread {
		overflow: scroll !important;
	    min-height: 100px !important;
	}
	.show {
		opacity: 1;
		display: block;
	}
	.hide {
		opacity: 0; display: none;
	}
	/*电子病历*/
	.medicalBox{
		height: 100%;
		width: 100%;
		background: #F8F9FB;
		position: relative;
	}
	.medicalTop{
		height: 105px;
		background: #7FBDFF;
	}
	.medicalContent{
		position: absolute;
		left: 0;
		top: 0;
		margin: 20px 12px 0 12px;
		box-sizing: border-box;
		width: calc(100% - 24px);
		z-index: 2;
	}
	.medicalContent .contentTitle{
		height:85px;
		border-top-left-radius: 40px;
		border-top-right-radius: 40px;
		background: #99CAFF;
		display: flex;
		flex-flow:column nowrap;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		background: rgba(255,255,255,0.2);
		box-shadow: 0 0 5px #73b7ff;
		position: relative;
	}
	.contentTitle .decoration{
		position: absolute;
		bottom: -7px;
		left: 0;
		z-index: 8;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.contentTitle .decoration>img:nth-child(1){
		margin-right: 30px;
	}
	.contentTitle .decoration>img:nth-child(2){
		margin-left: 30px;
	}
	.medicalContent .contentTitle h2{
		color: inherit;
		/*font-size: .4rem;*/
		font-size: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: normal;
		cursor: pointer;
	}
	.medicalContent .contentTitle h2 img{
		margin-left: 20px;
	}
	.contentTitle p span{
		/* font-size: .28rem; */
		 font-size: 14px; 
		color: inherit;
		line-height:2;
	}
	.contentTitle p{
		position: relative;
	}
	.contentTitle p:after,.contentTitle p:before{
		content: "";
		height:4px;
		width: 4px;
		border-radius: 100%;
		background: white;
	}
	.contentTitle p:after{
		position: absolute;
		left: -10px;
		top: 12px;
	}
	.contentTitle p:before{
		position: absolute;
		right: -10px;
		top: 12px;
	}
	.contentTitle p span:nth-child(2){
		margin:0 20px;
	}
	.medicalContent .contentText{
		border-bottom-left-radius: 40px;
		border-bottom-right-radius: 40px;
		width: 100%;
		background: white;
		box-shadow: 0 0 5px #dbe1e3;
		position: relative;
	}
	.itemText{
		padding-top: 20px;
	}
	.itemText .tabNav{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 15px;
		padding-right: 35px;
		cursor: pointer;
	}
	.itemText .tabNav>span{
		display: flex;
		/* height: .48rem; */
		 height: 24px; 
		/* width: 1.44rem; */
		 width: 72px; 
		/* border-radius: .24rem; */
		border-radius: 12px;
		text-align: center;
		vertical-align: middle;
		box-shadow: inset 0 0 5px #d3d7da;
		background: #E9F0F5;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		color: #7FBDFF;
	}
	.itemText>p{
		margin: 0 35px;
		padding-top: 10px;
		font-size: 14px;
		color: #898EA6;
		display: -webkit-box;
		-webkit-line-clamp:1;
		-webkit-box-orient: vertical;
		-ms-text-overflow: ellipsis;
		text-overflow: ellipsis;
		overflow: hidden;
		line-height: 1.2;
		text-align: justify;
	}
	.itemText>p.active{
		display: inline-block;
	}
	.dialogue.itemText .tabNav>span{
		background: #FCD210;
		color: white;
	}
	.dialogue.itemText{
		margin-top: 15px;
		padding-top: 15px;
		border-top: 2px solid #E9F0F5;
	}
	.dialogue.itemText>p{
		-webkit-line-clamp:5;
		padding-bottom: 100px;
	}
	.contentText>img{
		position: absolute;
		bottom: 0;
		right: -1px;
	}
	.medicalBox .markDrop{
		
	}
	.markDrop .dropContent{
		background: #FAFBFD;
		
		width: 100%;
	}
	.dropContent .selectItem p{
		font-size: 16px;
		color: #7FBDFF;
		text-align: center;
		background: white;
		line-height: 2;
	}
	.dropContent .selectItem{
		padding-top: 11px;
		cursor: pointer;
	}
	.dropContent .selectItem:last-child{
		padding-bottom: 11px;
	}
	.dropContent .selectItem:last-child p{
		color: #FD5EA1;;
	}
</style>