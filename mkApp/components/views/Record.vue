<template>
       <div class="phyDetail preLoad">
           <nav class="avatorNav">
               <div @click="togglePerson(index)" :key="index" v-for="(member, index) in MemberList.pData1" class="avatorItem" data-type="" data-id="">
                   <img src="../../../public/img/me_default@1x.png">
                   <span :class=" member.text === selectMember.name ? 'activet' : '' ">{{member.text}}</span>
               </div>
           </nav>
           <nav class="textNav">
               <p @click="toggle(false)" :class="!showFlag ? 'active': ''">折线图</p>
               <p @click="toggle(true)" :class="showFlag ? 'active': ''">表格</p>
           </nav>
           <!--表格 hide-->
           <section class="tableDisplay timeStatic">
                   <div v-show="!showFlag && chartFlag" id="chart">
                      <figure>
                         <chart :options="bar" ref="bar" theme="ovilia-green"></chart>
                      </figure>
                   </div>
                   <header>
                       <p><span>正常次数</span><span class="numberIsNormal">{{UserSignData.normalCount}}</span></p>
                       <p><span>偏高</span><span class="numberIsHeight">{{UserSignData.highCount}}</span></p>
                       <p><span>偏低</span><span class="numberIsLow">{{UserSignData.lowCount}}</span></p>
                   </header>
                   <section v-show="showFlag" id="tableItem">
                        <section class="tableList" :key="index" v-for="(itemWrap,index) in UserSignData.dataMap">
                              <h3><img src="../../../public/img/icon_Star.png"><span>{{index}}</span> </h3>
                              <section class="tableList" :key="cindex" v-for="(item,cindex) in itemWrap">
                                       <p v-if="item.heart">
                                         <span :class="{isHeight: item.heartStatus === 1, isLow: item.heartStatus === -1}">
                                             <em>{{item.heartValue}}次/分</em>
                                             <em >{{unitMap[item.heartStatus]}}</em>
                                         </span>
                                          <span>{{item.times.$numberLong|minSecond}}</span>
                                       </p>
                                       <p v-if="item.oxygen">
                                         <span :class="{isHeight: item.oxygenStatus === 1, isLow: item.oxygenStatus === -1}">
                                             <em>{{item.oxygenValue}}%</em>
                                             <em >{{unitMap[item.oxygenStatus]}}</em>
                                         </span>
                                          <span>{{item.times.$numberLong|minSecond}}</span>
                                       </p>
                                       <p v-if="item.sugar">
                                         <span :class="{isHeight: item.sugarStatus === 1, isLow: item.sugarStatus === -1}">
                                             <em>{{item.sugarValue}}mol/l</em>
                                             <em >{{unitMap[item.sugarStatus]}}</em>
                                         </span>
                                          <span>{{item.times.$numberLong|minSecond}}</span>
                                       </p>
                                       <p v-if="item.pressure">
                                         <span :class="{isHeight: item.pressureStatus === 1, isLow: item.pressureStatus === -1}">
                                             <em>{{item.szy}}/{{item.ssy}}mmHg</em>
                                             <em >{{unitMap[item.pressureStatus]}}</em>
                                         </span>
                                           <span>{{item.times.$numberLong|minSecond}}</span>
                                       </p>
                               </section>
                        </section>
                   </section>
           </section>
       </div>
</template>
<script>
    import { mapState } from 'vuex'
    import ECharts from 'vue-echarts'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/chart/line'
    import {initial as barInit, async as barAsync} from '~/mkApp/widget/echarts/data/bar'

    let legendMap = {
      '收缩压': false,
      '舒张压': false,
      '心率': false,
      '血糖': false,
      '血氧': false
    }

    let lineData = {
      tooltip: {
         trigger: 'axis',
         borderColor : "#000",
         backgroundColor:"#D1DDE6",
         textStyle:{
             color : "#fff",
         },
         axisPointer:{
             lineStyle :{
                 color:"#38E6FF"
             }
         },
         alwaysShowContent:false
      },
      xAxis: {
        data: []
      },
      yAxis: {
        axisLabel: {show: true}
      },
      legend: {
        data: ['收缩压','舒张压','心率','血糖','血氧'],
        selected: legendMap
      },
      series: [{
        name: '收缩压',
        type: 'line',
      }, {
        name: '舒张压',
        type: 'line',
      }, {
        name: '心率',
        type: 'line',
      }, {
        name: '血糖',
        type: 'line',
      }, {
        name: '血氧',
        type: 'line',
      }]
    }

    function getRelateData(name, Xdata, Ydata) {
        let nameMap = {
          '收缩压': false,
          '舒张压': false,
          '心率': false,
          '血糖': false,
          '血氧': false
        }
        nameMap[name] = true
        return {
          xAxis: {
            data: Xdata[name]
          },
          yAxis: {
            axisLabel: {show: true}
          },
          legend: {
            data: ['收缩压','舒张压','心率','血糖','血氧'],
            selected: nameMap
          },
          series: [{
            name: name,
            type: 'line',
            data: Ydata[name]
          }]
        }
    }
    export default {
        name: 'Record',
        data () {
            return {
                showFlag: true,
                chartFlag: true,
                curSelected: '舒张压',
                bar: lineData,
                unitMap: {
                  "0": '正常',
                  "-1": '偏低',
                  "1": '偏高'
                },
                name: '体格数据'
            }
        },
        components: {
          chart: ECharts
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
            togglePerson(index) {
               let curName = this.MemberList.pData1[index].text
               if(this.selectMember.name === curName) {
                  return;
               }
               this.selectMember.name = curName
               this.selectMember.user_id = this.MemberList.pData1[index].value

               let bar = this.$refs.bar

               bar.showLoading({
                 text: '正在加载',
                 color: '#4ea397',
                 maskColor: 'rgba(255, 255, 255, 0.4)'
               })

               this.$store.dispatch('fetchUserSignData', {
                  user_id: this.selectMember.user_id
               }).then(()=> {

                  let curData = getRelateData(this.curSelected, this.UserSignData.xData, this.UserSignData.yData)
                  bar.hideLoading()
                  bar.mergeOptions(curData)
               })
            },
            toggle(flag){
               this.showFlag = flag
            }
        },
        mounted() {
          console.log(this.UserSignData);
          let initData = getRelateData('舒张压', this.UserSignData.xData, this.UserSignData.yData)
          let bar = this.$refs.bar
          bar.mergeOptions(initData)
          bar.$on("legendselectchanged", (info)=>{
             if(!info.selected[info.name]) return;
            this.curSelected = info.name
            let curData = getRelateData(info.name, this.UserSignData.xData, this.UserSignData.yData)

            bar.mergeOptions(curData) 
          })
        }
    }
</script>
<style scoped>
      figure {
        width: 100vw;
        border: none;
        border-radius: 0;
        box-shadow: none;
        margin-top:20px;
      }
      figure .echarts {
          width: 100vw;
          min-width: 100%;
          height: 75vw;
      }
      .activet {
        color: #38E6FF;
      }
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
      background: rgb(244, 248, 252);
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