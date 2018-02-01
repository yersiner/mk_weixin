<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div id="main">
      <figure><chart :options="bar" ref="bar" theme="ovilia-green" auto-resize></chart></figure>
      <template>
        <p>
          <button v-for="(item, index) in xlist" :class="index === curIndex ? 'active': ''" @click="load(index)">{{item}}</button>
        </p>
      </template>
  </div>
</template>
<script>
    import ECharts from 'vue-echarts'
    import 'echarts/lib/chart/bar'
    import 'echarts/lib/chart/line'
    import {initial as barInit, async as barAsync} from './data/bar'

    export default {
        name: '',
        components: {
          chart: ECharts
        },
        data () {
            return {
                name: 'Line',
                bar: barInit,
                curIndex: 0,
                xlist: ['收缩压','舒张压','心率','血糖','血氧'],
                seconds: -1
            }
        },
        methods:{
            load (index) {
              // simulating async data from server
              console.log(index);
              this.curIndex = index
            }
        },
        mounted() {
          //console.log('wover');
          this.$refs.bar.$on("legendselectchanged", (info)=>{
             console.log(info);
             if(!info.selected[info.name]) return;
             let bar = this.$refs.bar
             this.seconds = 3
             //return;
             bar.showLoading({
               text: '正在加载',
               color: '#4ea397',
               maskColor: 'rgba(255, 255, 255, 0.4)'
             })

             let timer = setInterval(() => {
               this.seconds--
               if (this.seconds === 0) {
                 clearTimeout(timer)
                 bar.hideLoading()
                 bar.mergeOptions(barAsync)
               }
             }, 1000)
          })
        }
    }
</script>
<style scoped>
   
</style>