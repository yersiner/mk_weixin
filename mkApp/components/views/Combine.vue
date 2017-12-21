<template>
  <div class="combine">
      <div class="container">
          <p class="hTips">请输入医生为您创建的健康档案编号</p>
          <SimulateInput :numbers.sync="healthCode"></SimulateInput>
          <p class="tips" v-show="warnTips"><span>•</span>你输入的编号不存在，请输入正确的编号</p>

          <a @click="search" href="javascript:;" class="weui-btn weui-btn_plain-default submit-button">获取</a>

          <a @click="jump()" class="weui-btn weui-btn_plain-default warn-button">没有档案编号？</a>
      </div>
  </div>
</template>

<script>
  import SimulateInput from '~/mkApp/widget/simulateInput'
  export default {
    name: "Combine",
    data() {
      return {
        warnTips: false,
        healthCode: '',
        doctorId: this.$route.params.doctorId,
        section: 'test Blue'
      }
    },
    components: {
      SimulateInput
    },
    methods: {
      jump() {
          this.$router.push({ name: 'apply', params: { doctorId: this.doctorId }})
      },
      search() {
        if(!this.healthCode || this.healthCode.length < 8) {
          this.warnTips = true;
          return;
        }
        this.$store.commit('updateLoadingStatus', {isLoading: true, type: 'load', text: '正在加载'})

        this.$store.dispatch('bindHealthNum', {
          healthCode: this.healthCode,
          doctorId: this.doctorId === 'nice' ? '' : this.doctorId
        }).then((res)=>{
           if(res.data.code !== 200) {
             this.state.warnTips = true
             return;
           }
           //this.$store.commit('updateLoadingStatus', {isLoading: false, type: 'load', text: '正在加载'})   

           this.$router.push({ name: 'memberlist', params: { code: this.healthCode }})
           
           this.warnTips = false;
        }).catch(() => {
            this.$store.commit('updateErrorText', '绑定数据出错')
        })
        
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
      webkit-border-radius: 20px;
      margin-top: 30px;
      background: rgb(69, 230, 253);
      color: white;
      border: 0;
    }
    .warn-button {
      margin-top: 30px;
      color: #8499A7;
      font-size: 15px;
      border:0;
    }
    .tips span {
       padding-right: 5px;
    }
    .tips {
      margin-left: 20px;
      font-size: 12px;
      color: #FD5EA1;
      line-height: 50px;
    }
    .hTips {
      margin-left: 20px;
      font-size: 14px;
      color: black;
      line-height: 50px;
    }
    .weui-input {
      font-size: 15px;
    }
    .weui-cell__ft {
      background: rgb(69, 230, 253);
    }
    .weui-vcode-btnss {
        height: 48px;
        line-height: 43px;
        padding: 0 1.4em;
        color: white;
        font-size: 14px;
    }
    .weui-cells:before {
      border: 0;
    }
    .weui-cells:after {
      border: 0;
    }
    .container {
      padding-top: 1.476471rem;
    }
    .combine {
      height: 100%;
    }
    .wrap {
      width: 95%;
      margin: 0 auto;
    }
</style>