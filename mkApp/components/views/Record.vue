<template>
       <div class="phyDetail preLoad">
           <nav class="avatorNav">
               <div :key="index" v-for="(member, index) in MemberList.pData1" class="avatorItem" data-type="" data-id="">
                   <img src="../../../public/img/me_default@1x.png">
                   <span>{{member.text}}</span>
               </div>
           </nav>
           <nav class="textNav">
               <p @click="toggle(false)" :class="!showFlag ? 'active': ''">折线图</p>
               <p @click="toggle(true)" :class="showFlag ? 'active': ''">表格</p>
           </nav>
           <!--表格 hide-->
           <section class="tableDisplay timeStatic">
                  
                   <div v-if="!showFlag" id="chart">
                       <LineChart :xData="UserSignData.xData" :yData="UserSignData.yData"></LineChart>
                   </div>
                   <header>
                       <p><span>正常次数</span><span class="numberIsNormal">{{UserSignData.normalCount}}</span></p>
                       <p><span>偏高</span><span class="numberIsHeight">{{UserSignData.highCount}}</span></p>
                       <p><span>偏低</span><span class="numberIsLow">{{UserSignData.lowCount}}</span></p>
                   </header>
                   <section v-show="showFlag" id="tableItem">
                          <section class="tableList" :key="index" v-for="(item,index) in UserSignData.data">
                                   <h3><img src="../../../public/img/icon_Star.png"><span>{{item.day}}</span> </h3>
                                   <p v-if="item.heart.value">
                                     <span :class="{isHeight: item.heart.status === 1, isLow: item.heart.status === -1}">
                                         <em>{{item.heart.value}}{{item.heart.unit}}</em>
                                         <em >{{unitMap[item.heart.status]}}</em>
                                     </span>
                                      <span>{{item.times.$numberLong|minSecond}}</span>
                                   </p>
                                   <p v-if="item.oxygen.value">
                                     <span :class="{isHeight: item.oxygen.status === 1, isLow: item.oxygen.status === -1}">
                                         <em>{{item.oxygen.value}}{{item.oxygen.unit}}</em>
                                         <em >{{unitMap[item.oxygen.status]}}</em>
                                     </span>
                                      <span>{{item.times.$numberLong|minSecond}}</span>
                                   </p>
                                   <p v-if="item.sugar.value">
                                     <span :class="{isHeight: item.sugar.status === 1, isLow: item.sugar.status === -1}">
                                         <em>{{item.sugar.value}}{{item.sugar.unit}}</em>
                                         <em >{{unitMap[item.sugar.status]}}</em>
                                     </span>
                                      <span>{{item.times.$numberLong|minSecond}}</span>
                                   </p>
                                   <p v-if="item.pressure.dia_value">
                                     <span :class="{isHeight: item.pressure.status === 1, isLow: item.pressure.status === -1}">
                                         <em>{{item.pressure.dia_value}}/{{item.pressure.sys_value}}mmHg</em>
                                         <em >{{unitMap[item.pressure.status]}}</em>
                                     </span>
                                       <span>{{item.times.$numberLong|minSecond}}</span>
                                   </p>
                           </section>
                   </section>
           </section>
       </div>
</template>
<script>
    import { mapState } from 'vuex'
    import LineChart from '~/mkApp/widget/echarts/line'
    export default {
        name: 'Record',
        data () {
            return {
                showFlag: true,
                unitMap: {
                  "0": '正常',
                  "-1": '偏低',
                  "1": '偏高'
                },
                name: '体格数据'
            }
        },
        components: {
          LineChart
        },
        asyncData({store, route}) {
          var me = this;
          return store.dispatch('fetchMemberList', {
             name: 'record'
          }).catch((t)=>{
             //me.selectMember = me.MemberList.pData1[0].name
             //store.dispatch('fetchDoctorGuides') //查询该成员的随访信息
             console.log('error---', t);
          })
        },
        computed: {
           ...mapState([
             // map this.count to store.state.count
             'MemberList',
             'UserSignData',
             'selectMember',
             'openId'
           ])
        },
        methods:{
            toggle(flag){
               this.showFlag = flag
            }
        },
      //调用
        mounted(){
            
        }
    }
</script>
<style scoped>
      ul,li{
        list-style: none;
      }
      a{text-decoration: none;}
      input::-webkit-input-placeholder{
        font-size: .3rem;
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
        font-size: .24rem;
        /* font-family: "arial, helvetica, sans-serif,微软雅黑";*/
        background: white;
        color: #333333;
        margin: 0 auto;
        box-sizing: border-box;
        position: relative;
      }

    .phyDetail{
      width: 100%;
      height: 100%;
    }
    .preLoad {
      /*visibility: hidden;*/
    }
    .phyDetail nav.avatorNav{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: nowrap row;
      padding-top:10px;
      padding-bottom: 18px;
    }
    nav.avatorNav .avatorItem{
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: nowrap column;
      font-size: 13px;
      color: #8FACC8;
    }
    nav.avatorNav .avatorItem:nth-child(2){
      padding: 0 44px;
    }
    .avatorItem img{
      width: 52px;
      height: 52px;
      object-fit: cover;
      border-radius: 100%;
    }
    nav.avatorNav .avatorItem.active{
      color: #56E9FF;
    }
    .phyDetail nav.textNav{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 15px;
    }
    .phyDetail nav.textNav>p{
      font-size: 15px;
      color: #898EA6;
      width: 88px;
      text-align: center;
      margin-left: 5px;
    }
    .phyDetail nav>p.active{
      background: #38E6FF;
      border-radius: 20px;
      line-height: 36px;
      color: white;
      box-shadow: inset 0 0 10px #38E6FF;
    }
    .lineChart .chartDes,.tableDisplay header {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-flow: nowrap row;
    }
    .chartDes>p,.tableDisplay header>p{
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      color: #8FACC8;
      font-weight: 500;
    }
    .lineChart .chartDes{
      margin-top: 48px;
    }
    .phyUnit{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px;
      font-size:12px;
      color: #8FACC8;
      margin-top: 10px;
    }
    .phyUnit .firstColor{
      color: #C33834;
    }
    .phyUnit .secondColor{
      color: #2F4554;
    }
    .phyUnit .thirhColor{
      color:#61A0A8;
    }
    .phyUnit .fourColor{
      color: #D48265;
    }
    .chartDes>p span:first-child,.tableDisplay header>p span:first-child{
      font-size: 16px;
    }
    .chartDes>p span:last-child,.tableDisplay header>p span:last-child{
      font-size: 48px;
      transform: scale(1,1.2);
      -ms-transform: scale(1,1.2);
      -webkit-transform: scale(1,1.2);
      -moz-transform: scale(1,1.2);
      -o-transform: scale(1,1.2);
      margin-top: 5px;
    }
    .lineChart{
      width: 100%;
      height: 100%;
    }
    .lineChart .chart{
      width: inherit;
      height: 40%;
      position: relative;
      margin-top: 25px;
    }
    .lineChart #chart{
      /*width: inherit;*/
      padding-right: 2%;
      height: 100%;
    }
    .chart .low,.chart .hight{
      position: absolute;
      font-size: 12px;
      color: #8FACC8;
      left: 35px;
    }
    .chart .hight{
      bottom:88%;
    }
    .chart .low{
      bottom: 38%;
    }
    .hide{
      display: none!important;
    }
    #tableItem{
      padding-bottom: 15px;
    }
    .tableDisplay header{
      margin-top: 20px;
    }
    .tableList{
      margin-top: 15px;
    }
    .tableList h3{
      background: #E9F0F5;
      line-height: 2;
      padding-left: 15px;
      font-size: 16px;
      color: #898EA6;
    }
    .tableList h3 span{
      padding-left: 5px;
    }
    .tableList p{
      font-size: 15px;
      color: #898EA6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 15px 0 30px;
    }
    .isHeight{
      color:#FD5EA1;;
    }
    .isLow{
      color: #FCD210;;
    }
    .tableList p span em:last-child{
      margin-left: 15px;
    }
</style>