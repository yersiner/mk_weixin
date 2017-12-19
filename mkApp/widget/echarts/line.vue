<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main"></div>
</template>
<script>
//import echarts from 'echarts'

function getOption(xData, yData) {
    console.log('333333--->', xData, yData);
    return {
        color:['#CAB1FF', '#FF8E94','#64B3F9', '#6DDACB','#FFBF67'],
          tooltip: {
              trigger: 'axis',
             /* formatter : "90/140",*/
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
              alwaysShowContent:true
          },
          legend :{
              data:['收缩压','舒张压','心率','血糖','血氧'],
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true,
              show: true,
              borderWidth: 0,
              borderColor:"#D1DDE6",
              backgroundColor: '#fff',
          },
          xAxis: {
              type: 'category',
              boundaryGap: false,
              axisLine:{
                  lineStyle:{
                      color : "#D1DDE6"
                  }
              },
              axisLabel:{
                  color : "#898EA6",
                  fontSize : 14
              },
              //data: ['12日','13日','14日','15日','16日','17日', '18日']
              data: xData
          },
          yAxis: {
              type: 'value',
              show:true,
              axisLine:{
                  show:false,
                  lineStyle:{
                      color : "#D1DDE6"
                  }
              },
              axisLabel:{
                  color : "#898EA6",
                  fontSize : 14
              },
            // data: ['0','60','90','140','200']
              // containLabel:false
          },
          series:[
                    {
                        name : '收缩压',
                        type : 'line',
                        //data:[60,62,65,68,68,66,63]
                        data: yData.sys_value
                    },{
                        name :'舒张压',
                        type:'line',
                        data: yData.dia_value
                        //data:[70,75,75,75,72,74]
                    },
                    {
                        name:'心率',
                        type:'line',
                        data: yData.heart
                        //data:[80,88,86,82,85,81]
                    },
                    {
                        name:'血糖',
                        type:'line',
                        data: yData.sugar
                        //data:[90,91,95,94,100,98]
                    },{
                        name:'血氧',
                        type:'line',
                        data: yData.oxygen
                        //data:[109,112,111,110,102,108]
                    }
          ]
      };
    }
    export default {
        name: '',
        props: {
          xData: {
            type: Array,
            default: []
          },
          yData: {
            type: Object,
            default: {}
          }
        },
        data () {
            return {
                name: 'Line'
            }
        },
        methods:{
            drawPie(id){
               this.charts = this.$echarts.init(document.getElementById(id))
               let Goption = getOption(this.xData, this.yData);
               this.charts.setOption(Goption)
            }  
        },
      //调用
        mounted(){
            this.$nextTick(function() {
                this.drawPie('main')
            })
        }
    }
</script>
<style scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }
    #main {
      height: 50%;
    }
</style>