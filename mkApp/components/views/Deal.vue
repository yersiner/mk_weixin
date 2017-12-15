<template>
  <div id="deal">
    <div class="apply-success">
        <div class="icon-box box-wrap">
            <i class="weui-icon-success weui-icon_msg theme"></i>
            <div class="icon-box__ctn">
                <h3 class="icon-box__title mt">提交成功</h3>
                <p class="icon-box__desc ico-desc">我们会在24小时内给您安排签约医生 请耐心等待！</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Deal",
    computed: mapState([
      // map this.count to store.state.count
      'status'
    ]),
    data() {
      return {
        section: 'test Bar'
      }
    }
  }
</script>

<style scoped>
    .submit-button {
      width: 240px;
      height: 44px;
      line-height: 44px;
      border-radius: 20px;
      margin-top: 30px;
      background: rgb(69, 230, 253);
      color: white;
      border: 0;
    }
    .ag {
      margin-left: -10%;
      font-size:14px;
      word-wrap: break-word;
      text-align:justify;
    }
    .fw {
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 8%;
    }
    .box-wrap {
      text-align: center;
      padding-top: 20%;
    }
    .mt {
      margin-top: 15px;
      margin-bottom: 20px;
    }
    .ico-desc {
      padding: 0 22%;
      font-size: 14px;
    }
    .ao-desc {
      padding: 0 20%;
      font-size: 14px;
    }
    .theme {
       color: #38E6FF;
       font-size: 60px;
    }
    #deal {
      height: 100%;
    }
</style>