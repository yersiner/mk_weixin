<template>
  <div class="combine">
      <div class="container">
          <div class="weui-cells weui-cells_form wrap">
              <div class="weui-cell weui-cell_vcode">
                    <div class="weui-cell__bd">
                        <input v-model="healthCode" class="weui-input" type="tel" placeholder="请输入医生为您创建的健康档案编号">
                    </div>
                    <div class="weui-cell__ft">
                        <button @click="search()" class="weui-vcode-btn">提交</button>
                    </div>
                </div>
          </div>
          <p class="tips"><span>•</span>请输入正确的编号</p>
          <router-link to="/apply" class="weui-btn weui-btn_plain-default warn-button">没有档案编号？</router-link>
      </div>
  </div>
</template>

<script>
  export default {
    name: "Combine",
    data() {
      return {
        healthCode: 'K21b8078773',
        section: 'test Blue'
      }
    },
    methods: {
      search() {
        this.$router.push({ name: 'memberlist', params: { code: 323232 }})
        return;
        this.$store.commit('updateLoadingStatus', {isLoading: true, type: 'load', text: '正在加载'})

        this.$store.dispatch('bindHealthNum', this.healthCode).then((res)=>{
           if(res.data.code !== 200) {
             this.$store.dispatch('displayErrorLoad');
             this.$store.commit('updateErrorText', '绑定数据出错')
             return;
           }
           this.$store.commit('updateLoadingStatus', {isLoading: false, type: 'load', text: '正在加载'})   

           this.$router.push({ name: 'memberlist', params: { code: this.healthCode }})
        }).catch(() => {
            this.$store.commit('updateErrorText', '绑定数据出错')
        })
        
      }
    }
  }
</script>

<style scoped>
    .warn-button {
      width: 180px;
      height: 32px;
      line-height: 32px;
      border-radius: 20px;
      webkit-border-radius: 20px;
      margin-top: 30px;
      background: #E9F0F5;
      color: #8499A7;
      font-size: 15px;
      border:0;
    }
    .tips span {
       padding-right: 5px;
    }
    .tips {
      margin-left: 20px;
      font-size: 17px;
      color: #FD5EA1;
      line-height: 50px;
    }
    .weui-input {
      font-size: 15px;
    }
    .weui-cell__ft {
      background: rgb(69, 230, 253);
    }
    .weui-vcode-btn {
      color: white;
      border: 0;
      margin-right: 5px;
    }
    .weui-cells:before {
      border: 0;
    }
    .weui-cells:after {
      border: 0;
    }
    .container {
      padding-top: 2.976471rem;
    }
    .combine {
      height: 100%;
    }
    .wrap {
      width: 95%;
      margin: 0 auto;
    }
</style>