<template>
  <div class="member-list">
      <div class="page__bd container" style="min-height: 100%;">
          <div class="weui-tab">
              <a @click="showList()" class="weui-cell weui-cell_access top-head" href="javascript:;">
                  <div class="weui-cell__bd item">
                      <p>{{code}}---{{selectMember}}</p>
                  </div>
                  <div class="weui-cell__ft" style="margin-right: 18px;">
                      <span>请选择</span>
                  </div>
              </a>
              <a class="weui-cell weui-cell_access blank" href="javascript:;">
                  
              </a>
              <vue-better-scroll
                  style="height:600px"
                      class="wrapper"
                      :scrollbar="scrollbarObj"
                      ref="scroll"
                      :pullUpLoad="pullUpLoadObj"
                      :startY="parseInt(startY)"
                      @pullingUp="onPullingUp">
                  <div ref="list" class="weui-panel__bd">
                      <div class="weui-media-box weui-media-box_text" :key="index" v-for="(item, index) in items">
                          <h4 class="weui-media-box__title title"><span class="stat">★</span>{{item}}</h4>
                          <p class="weui-media-box__desc desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
                      </div>
                  </div>
              </vue-better-scroll>
          </div>
      </div>
       <vue-pickers :hide="onceShowList" :show="showPickList"
          :selectData="pickList"
          v-on:cancel="closeList"
          v-on:confirm="confirmList"></vue-pickers>
  </div>
</template>

<script>
  import VuePickers from '~/mkApp/widget/picker'
  import VueBetterScroll from 'vue2-better-scroll'
  let count = 1;
  export default {
    name: "MemberList",
    components: {
      VuePickers,
      VueBetterScroll
    },
    asyncData({store, route}) {
      return store.dispatch('fetchMemberList', route.params.id)
    },
    mounted () {
      this.onPullingUp()
    },
    data() {
      return {
        // 这个配置用于做下拉刷新功能，默认为 false。当设置为 true 或者是一个 Object 的时候，可以开启下拉刷新，可以配置顶部下拉的距离（threshold） 来决定刷新时机以及回弹停留的距离（stop）
        pullUpLoadObj: {
            threshold: 0,
            txt: {
             more: '加载更多',
             noMore: '没有更多数据了'
            }
        },
        scrollbarObj: {
          fade: true
        },
        startY: 0,  // 纵轴方向初始化位置
        scrollToX: 0,
        scrollToY: 0,
        scrollToTime: 700,
        items: [],
        selectMember: '',
        showPickList: false,
        onceShowList: false,
        pickList: {
          columns: 1,
          pData1: [{
              text: 1999,
              value: 1999
            },
            {
              text: 2001,
              value: 2001
            },
            {
              text: 2002,
              value: 2002
            }]
        },
        code: this.$route.params.code,
        section: 'test Blue'
      }
    },
    methods: {
      // 模拟数据请求
      getData () {
       return new Promise(resolve => {
         setTimeout(() => {
           const arr = []
           for (let i = 0; i < 20; i++) {
             arr.push(count++)
           }
           resolve(arr)
         }, 1000)
       })
      },
      onPullingUp () {
        // 模拟上拉 加载更多数据
        console.log('上拉加载')
        this.getData().then(res => {
          this.items = this.items.concat(res)
          if(count<50){
            this.$refs.scroll.forceUpdate(true)
          }else{
            this.$refs.scroll.forceUpdate(false)
          }
        })
      },
      closeList() {
        var me = this;
        setTimeout(() => {
          me.onceShowList = false;
        }, 500)
        this.showPickList = false;
      },
      confirmList(data){
        var str = `${data.select1.text}`
        this.selectMember = str
        this.closeList();
      },
      showList() {
        this.onceShowList = true;
        this.showPickList = true;
      },
      jump(t) {
        console.log('jump--', t);
        //this.$router.push({ name: 'user', params: { id: 123 }})
        this.$router.push({ name: 'user', params: { id: 123 }})
      }
    }
  }
</script>

<style scoped>
    .top-head {
      position: relative;
      z-index: 10;
      background:white;
    }
    .wrapper {
      position: relative;
      z-index: 9;
    }
    .desc {
      color: #1B2E4C;
      line-height: 25px;
      width: 87%;
      margin: auto;
      min-height: 75px;
    }
    .title {
      background: #F4F8FC;
      font-size: 15px;
      color: #1B2E4C;
      height: 40px;
      line-height: 40px;
    }
    .title .stat {
      padding: 0 10px;
      font-size: 9px;
      position: relative;
      top:-2px;
      color:#D1DDE6;
    }
    .member-list .blank {
      padding-bottom: 0px;
      margin-bottom: 0px;
      padding-top:0;
    }
    .weui-cell:before {
      right: 10px;
    }
    .item {
      color: #38E6FF;
      font-size:22px;
    }
    .tab-item {
      margin-right: 10px;
    }
    .container {
      background: white;
    }
</style>