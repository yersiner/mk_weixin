<template>
  <div class="member-list">
      <div class="page__bd container" style="min-height: 100%;">
          <div class="weui-tab cpane">
              <a @click="showList()" class="weui-cell weui-cell_access top-head" href="javascript:;">
                  <div class="weui-cell__bd item">
                      <p style="padding-left: 25px; font-size:22px;">{{selectMember.name}}</p>
                  </div>
                  <div class="weui-cell__ft" style="margin-right: 18px;">
                      <span>请选择</span>
                  </div>
              </a>
              <a class="weui-cell weui-cell_access blank" href="javascript:;">
                  
              </a>
              <vue-better-scroll
                  style="min-height:500px"
                      class="wrapper"
                      :scrollbar="scrollbarObj"
                      ref="scroll"
                      :pullUpLoad="pullUpLoadObj"
                      :startY="parseInt(startY)"
                      @pullingUp="onPullingUp">
                  <div ref="list" class="weui-panel__bd">
                      <div class="weui-media-box weui-media-box_text" :key="index" v-for="(item, index) in MemberInfoList">
                          <h4 class="weui-media-box__title title"><span class="stat">★</span>
                            {{item.times.$numberLong|prettyDate}} &nbsp&nbsp&nbsp {{item.doctorName}}医生</h4>
                          <p class="weui-media-box__desc desc">{{item.desc}}</p>
                      </div>
                  </div>
              </vue-better-scroll>
          </div>
      </div>
       <vue-pickers :hide="onceShowList" :show="showPickList"
          :selectData="MemberList"
          v-on:cancel="closeList"
          v-on:confirm="confirmList"></vue-pickers>
  </div>
</template>

<script>
  import VuePickers from '~/mkApp/widget/picker'
  import VueBetterScroll from 'vue2-better-scroll'
  import { mapState } from 'vuex'

  let count = 1;
  export default {
    name: "MemberList",
    computed: {
       totalCount() {
           return count * 4
       },
       ...mapState([
         // map this.count to store.state.count
         'MemberInfoList',
         'MemberList',
         'selectMember',
         'openId'
       ])
    },
    components: {
      VuePickers,
      VueBetterScroll
    },
    asyncData({store, route}) {
      var me = this;
      return store.dispatch('fetchMemberList', {
        name: 'guide'
      }).catch(()=>{
         //me.selectMember = me.MemberList.pData1[0].name
         //debugger;
         //store.dispatch('fetchDoctorGuides') //查询该成员的随访信息
         console.log('error---niceMemberList');
      })
    },
    mounted () {
      //this.onPullingUp()
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
        showPickList: false,
        onceShowList: false,
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
        count++;
        //console.log('0000--->count', count);
        // 模拟上拉 加载更多数据
        this.$store.dispatch('fetchDoctorGuides', {
          user_id: this.selectMember.user_id,
          currentPage: count
        }).then((res) => {
            this.$store.commit('updateMemberInfoList', {
              current: true,
              ...res.data.obj
            });
            this.$store.commit('updateLoadingStatus', {isLoading: false, type: 'load', text: '正在提交'})
            if(count < res.data.obj.totalCount){
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
        if(str === this.selectMember.name) {
          this.closeList();
          console.log('same as name');
          return;
        }
        this.selectMember.name = str
        this.selectMember.user_id = data.select1.value

        //查询该成员的随访信息
        count = 0;
        this.$refs.scroll.forceUpdate(true)
        this.$store.dispatch('fetchDoctorGuides', {
          user_id: this.selectMember.user_id,
          currentPage: 1
        }).then((res) => {
          this.$store.commit('updateMemberInfoList', {
            current: false,
            ...res.data.obj
          });
          this.$store.commit('updateLoadingStatus', {isLoading: false, type: 'load', text: '正在提交'})

        })
        this.closeList();
      },
      showList() {
        this.onceShowList = true;
        this.showPickList = true;
      },
      jump(t) {
        //this.$router.push({ name: 'user', params: { id: 123 }})
        this.$router.push({ name: 'user', params: { id: 123 }})
      }
    }
  }
</script>

<style scoped>
    .cpane {
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      -webkit-flex-direction: column;
    }
    .weui-media-box:before {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 0px solid #e5e5e5;
        color: #e5e5e5;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        left: 15px;
    }
    .top-head {
      height: 30px;
      position: relative;
      z-index: 10;
      background:white;
    }
    .wrapper {
      flex:1;
      webkit-flex:1;
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