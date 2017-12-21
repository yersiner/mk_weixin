<template>
      <div class="familyDoctor" style="">
        <div class="doctorInfo">
          <!--内容部分-->
          <div class="doctorAvator">
            <h3>工号 : <span>{{DoctorInfo.job_number}}</span></h3>
            <div class="doctorName">
              <div class="avator">
                <img src="../../../public/img/avator.jpg">
                <img v-if="DoctorInfo.sex === 1" src="../../../public/img/man_icon@2x.png">
                <img v-if="DoctorInfo.sex === 2" src="../../../public/img/woman_icon@2x.png">
              </div>
              <div class="name">
                <span></span>
                <span>{{DoctorInfo.name}}</span>
                <span></span>
              </div>
              <p class="des">主治医生</p>
            </div>
          </div>
          <!--医生信息-->
          <div class="doctorContact">
            <div class="contactDes">
              <p class="desLeft">
                <i class="microtchFamily microtech-education"></i>
                <span>学历</span>
              </p>
              <p class="desRight" id="education">{{DoctorInfo.education}}</p>
            </div>
            <div class="contactDes margin">
              <p class="desLeft">
                <i class="microtchFamily microtech-phone_icon_search_pr"></i>
                <span>电话</span>
              </p>
              <p class="desRight" id="phone">{{DoctorInfo.phone}}</p>
            </div>
            <div class="contactDes">
              <p class="desLeft">
                <i class="microtchFamily microtech-hospital_icon_search"></i>
                <span >医院</span>
              </p>
              <p class="desRight" id="workAdd">{{DoctorInfo.hospitalName}}</p>
            </div>
          </div>
          <div class="doctorDes">
            <div class="desTitle">
              <span></span>
              <span>简介 : </span>
            </div>
            <div class="desContent">
                {{DoctorInfo.desc}}
            </div>
          </div>
          <div class="workTime">
            <div class="workContent">
              <ul class="workTitle">
                <li><i class="microtchFamily microtech-tingzhenqi_stethoscope"></i><span>门诊时间</span></li>
              </ul>
              <ul class="workText title">
                <li></li>
                <li>上午</li>
                <li>中午</li>
                <li>晚上</li>
              </ul>
              <ul class="workText" v-for="(item,index) in DoctorInfo.visits_weeks">
                <li class="weekDay">{{weekMap[index]}}</li>
                <li><i class="microtchFamily" :class="item.forenoon ? 'microtech-gou': '' "></i></li>
                <li><i class="microtchFamily" :class="item.atnoon ? 'microtech-gou': '' "></i></li>
                <li><i class="microtchFamily" :class="item.evening ? 'microtech-gou': '' "></i></li>
              </ul>
              <ul class="workTextEnd">
                <li>&nbsp;</li>
                <li>&nbsp;</li>
                <li>&nbsp;</li>
                <li>&nbsp;</li>
              </ul>
            </div>
          </div>
      </div>
      <div class="getBottom">
        <span></span>
        <span>到底啦</span>
        <span></span>
      </div>
      <div class="button">
        <button @click="concat()" id="contactBtn">联系医生</button>
      </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "DoctorDetail",
    computed: mapState([
      // map this.count to store.state.count
      'DoctorInfo',
      'openId',
      'status'
    ]),
    asyncData({store, route}) {
      return store.dispatch('fetchDoctorInfo')
    },
    data() {
      return {
        title: 'userInfo',
        weekMap: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
      }
    },
    methods: {
      concat() {
          console.log('close wx');
          wx.closeWindow();
      }
    }
  }
</script>

<style scoped>
    ul,li{
      list-style: none;
    }
    a{text-decoration: none;}
    input::-webkit-input-placeholder{
      font-size: 15px;
      color: #D1DDE6;
    }
    i,em{
      font-style: normal;
    }
    html{
      height: 100%;
      font-size: 50px;
    }
    body{
      width: 100%;
      height: 100%;
      min-width: 320px;
      max-width: 768px;
      min-height: 100%;
      font-size: 15px;
      /* font-family: "arial, helvetica, sans-serif,微软雅黑";*/
      background: white;
      color: #333333;
      margin: 0 auto;
      box-sizing: border-box;
      position: relative;
    }
          /*家庭医生*/
    .familyDoctor{
      background: rgba(250,251,253,1);
      overflow: hidden;
      box-sizing: border-box;
    }
    .familyDoctor .doctorInfo{
      background: rgba(255,255,255,1);
      margin: 0 12px;
    }
    .doctorInfo .doctorAvator{
      margin-top: 12px;
      height: 27%;
      background-image: linear-gradient(-135deg, rgba(55,187,251,0.50) 0%, #7FBDFF 100%);
      border-radius: 4px;
      webkit-border-radius: 4px;
      width: 100%;
      padding-bottom: 10px;
    }
    .doctorAvator h3{
      color: #ffffff;
      font-size: 12px;
      padding: 12px;
    }
    .doctorAvator .doctorName{
      display: flex;
      display: webkit-flex;
      flex-flow: column nowrap;
      webkit-flex-flow: column nowrap;
      justify-content: space-between;
       -webkit-justify-content: space-between;
      align-items: center;
      webkit-align-items: center;
      margin-top: 2px;
    }
    .doctorName .avator img:nth-child(1){
      height: 60px;
      width: 60px;
      object-fit: cover;
      border-radius: 100%;
      webkit-border-radius: 100%;
      border:1px solid  #fff;
    }
    .doctorName .avator{
      position: relative;
    }
    .avator img:nth-child(2),.avator img:nth-child(3){
      position: absolute;
      right: 0;
      bottom: 0;
      height: 16px;
      width: 16px;
      border-radius: 100%;
      webkit-border-radius: 100%;
    }
    .doctorName .name{
      display:flex ;
      display:webkit-flex ;
      justify-content: space-between;
      webkit-justify-content: space-between;
      align-items: center;
      webkit-align-items: center;
      padding-top: 12px;
    }
    .doctorName .name>span:nth-child(1),.doctorName .name>span:nth-child(3){
      height: 2px;
      width: 20px;
      background: #ffffff;
      border-radius: 1px;
      webkit-border-radius: 1px;
    }
    .doctorName .name>span:nth-child(2){
      color: #fff;
      font-size: 16px;
      /*padding: 0 12px;*/
    }
    .doctorName .des{
      color: #ffffff;
      font-size: 15px;
    }
    .doctorContact{
      padding: 19px 0;
      position: relative;
    }
    .doctorContact:after{
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: rgba(233,240,245,1);
    }
    .doctorContact .contactDes{
      display: flex;
      display: webkit-flex;
      justify-content: space-between;
      webkit-justify-content: space-between;
      align-items: center;
      webkit-align-items: center;
    }
    .contactDes.margin{
      margin: 17px 0;
    }
    .desLeft span{
      color: #94AFCA;
      font-size: 16px;
    }
    .desLeft i{
      color: #E9F0F5;
      font-size: 15px;
      padding-left: 10px;
      padding-right: 5px;
    }
    .desRight{
      padding-right: 12px;
      font-size: 16px;
      color: #8B90A8;
      letter-spacing: 0;
    }
    .doctorDes{
      padding-top: 12px;
    }
    .doctorDes .desTitle{
      padding-bottom: 12px;
    }
    .doctorDes .desTitle>span:nth-child(1){
      height: 8px;
      width: 8px;
      border-radius: 100%;
      webkit-border-radius: 100%;
      background: #38E6FF;
      margin-left: 12px;
      margin-right: 10px;
      display: inline-block;
    }
    .doctorDes .desTitle>span:nth-child(2){
      color: #94AFCA;
      font-size: 16px;
    }
    .doctorDes  .desContent{
      font-size: 15px;
      color: #898EA6;
      letter-spacing: 0;
      padding-left: 34px;
      line-height: 1.2;
    }
    .workTime{
      padding: 30px 18px;
    }
    .workContent{
      -webkit-border-radius: 40px;
      -moz-border-radius: 40px;
      border-radius: 40px;
      webkit-border-radius: 40px;
      overflow: hidden;
      box-sizing: border-box;
    }
    .workTime .workTitle>li{
      text-align: center;
    }
    .workTime .workTitle>li{
      font-size: 16px;
      color: white;
      background: #7FBDFF;
      text-align: center;
      line-height: 2;
    }
    .workTime  .workTitle>li *{
      font-size: inherit;
      color: inherit;
    }
    .workTime  .workTitle>li i{
      padding: 0 2px;
    }
    .workContent .workText,.workTextEnd{
      display: flex;
      display: webkit-flex;
      justify-content: space-between;
      webkit-justify-content: space-between;
      align-items: center;
      webkit-align-items: center;
      background: #E9F0F5;
      line-height: 2;
      text-align: center;
      font-size: 15px;
      color: #898EA6;
      position: relative;
    }
    .workContent .workText:after{
      content: "";
      height: 1px;
      width: 100%;
      background: #CFD9E8;
      position: absolute;
      bottom: 0;
      left: 0;
    }

    .workContent .workText li{
      flex: 1;
      webkit-flex: 1;
    }
    .workContent .workText li .microtech-gou{
      color: #2AD0B7;
    }
    .weekDay{
      font-size: 12px;
      color: #A2ADCE;
    }
    .familyDoctor .getBottom{
      margin: 0 12px;
      display: flex;
      webkit-display: flex;
      justify-content: space-between;
      webkit-justify-content: space-between;
      align-items: center;
      webkit-align-items: center;
      flex-flow: row nowrap;
      webkit-flex-flow: row nowrap;
      margin-top: 8px;
      margin-bottom: 68px;
    }
    .familyDoctor .getBottom>span:nth-child(1),.familyDoctor .getBottom>span:nth-child(3){
      width: 100%;
      display: inline-block;
      height: 1px;
      background: #E9F0F5;
    }
    .familyDoctor .getBottom>span:nth-child(2){
      margin: 0 12px;
      white-space: nowrap;
      color: #CFD9E8;
      font-size: 14px;
    }
    .familyDoctor .button>button,.applySubmit>button{
      line-height: 2;
      width: 207px;
      background: #7FBDFF;
      -webkit-border-radius: 40px;
      -moz-border-radius: 40px;
      border-radius: 40px;
      webkit-border-radius: 40px;
      border: none;
      font-size: 15px;
      color: #FFFFFF;
      display: block;
      margin-left:auto;
      margin-right: auto;
      margin-top: 12px;
      margin-bottom: 12px;
      position: relative;
      outline: none;
      box-shadow: inset 0 0 5px #7FBDFF;
    }
    .familyDoctor .button{
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translate(-50%);
      background: white;
      width: 100%;
      padding-top: 5px;
    }
</style>