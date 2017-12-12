<template>
  <div class="member-list">
      <div class="page__bd container" style="min-height: 100%;">
          <div class="weui-tab">
              <a class="weui-cell weui-cell_access" href="javascript:;">
                  <div class="weui-cell__bd item">
                      <p>家庭成员1</p>
                  </div>
                  <div class="weui-cell__ft" style="margin-right: 18px;">
                      <span>请选择</span>
                  </div>
              </a>
              <a class="weui-cell weui-cell_access blank" href="javascript:;">
                  
              </a>
              <div class="weui-panel__bd">
                      <div class="weui-media-box weui-media-box_text">
                          <h4 class="weui-media-box__title title"><span class="stat">★</span>标题一</h4>
                          <p class="weui-media-box__desc desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
                      </div>
                      <div class="weui-media-box weui-media-box_text">
                          <h4 class="weui-media-box__title title"><span class="stat">★</span>标题二</h4>
                          <p class="weui-media-box__desc desc">由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。</p>
                      </div>
                  </div>
              </div>
          </div>
  </div>
</template>

<script>
  export default {
    name: "MemberList",
    data() {
      return {
        section: 'test Blue'
      }
    },
    methods: {
      jump(t) {
        console.log('jump--', t);
        //this.$router.push({ name: 'user', params: { id: 123 }})
        this.$router.push({ name: 'user', params: { id: 123 }})
      }
    }
  }
</script>

<style scoped>
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