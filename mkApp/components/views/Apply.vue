<template>
  <div class="apply">
      <div v-show="true" class="applyform">
          <div class="pane pt">
              <div class="weui-cells__title title clt">基本信息</div>
              <div class="weui-cells weui-cells_form">
                  <div class="weui-cell">
                      <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                      <div class="weui-cell__bd">
                          <input class="weui-input" placeholder="请输入姓名"/>
                      </div>
                  </div>
                  <div class="weui-cell">
                      <div class="weui-cell__hd">
                          <label class="weui-label">手机号</label>
                      </div>
                      <div class="weui-cell__bd">
                          <input class="weui-input" type="tel" placeholder="请输入手机号"/>
                      </div>
                  </div>
                  <a  @click="showCity()" class="weui-cell weui-cell_access" href="javascript:;">
                      <div class="weui-cell__bd item">
                          <p>地区</p>
                      </div>
                      <div class="weui-cell__ft" style="font-size:15px">
                          <span>{{selectCity}}</span>
                      </div>
                  </a>
                  <a @click="showList()" class="weui-cell weui-cell_access" href="javascript:;">
                      <div class="weui-cell__bd item">
                          <p>医院</p>
                      </div>
                      <div class="weui-cell__ft" style="font-size:15px">
                          <span>{{selectHot}}</span>
                      </div>
                  </a>
                  <div class="weui-cell">
                      <div class="weui-cell__hd">
                          <label class="weui-label">住址</label>
                      </div>
                      <div class="weui-cell__bd">
                          <input class="weui-input" type="tel" placeholder="请输入手机号"/>
                      </div>
                  </div>
              </div>
          </div>
          <div class="pane">
              <div class="weui-cells__title title">重点标记人群(多选)</div>
              <div class="weui-cells weui-cells_checkbox">
                <label class="weui-cell weui-check__label" for="s11">
                    <div class="weui-cell__bd">
                        <p>糖尿病</p>
                    </div>
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" name="checkbox1" id="s11" checked="checked">
                        <i class="weui-icon-checked"></i>
                    </div>
                </label>
                <label class="weui-cell weui-check__label" for="s12">
                    <div class="weui-cell__bd">
                        <p>高血压</p>
                    </div>
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" name="checkbox2" id="s12" checked="checked">
                        <i class="weui-icon-checked"></i>
                    </div>
                </label>
                <label class="weui-cell weui-check__label" for="s13">
                    <div class="weui-cell__bd">
                        <p>老年人</p>
                    </div>
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" name="checkbox3" id="s13" >
                        <i class="weui-icon-checked"></i>
                    </div>
                </label>
                <label class="weui-cell weui-check__label" for="s14">
                    <div class="weui-cell__bd">
                        <p>孕妇</p>
                    </div>
                    <div class="weui-cell__hd">
                        <input type="checkbox" class="weui-check" name="checkbox4" id="s14" >
                        <i class="weui-icon-checked"></i>
                    </div>
                </label>
            </div>
          </div>
          <a href="javascript:;" class="weui-btn weui-btn_plain-default submit-button">提交</a>
          <vue-pickers :hide="onceShow" :show="showPickCity"
          :selectData="pickCityData"
          v-on:cancel="closeCity"
          v-on:confirm="confirmCity"></vue-pickers>
          <vue-pickers :hide="onceShowList" :show="showPickList"
          :selectData="pickList"
          v-on:cancel="closeList"
          v-on:confirm="confirmList"></vue-pickers>
      </div>
      <div v-show="false" class="apply-success">
          <div class="icon-box box-wrap">
              <i class="weui-icon-success weui-icon_msg theme"></i>
              <div class="icon-box__ctn">
                  <h3 class="icon-box__title mt">提交成功</h3>
                  <p class="icon-box__desc ico-desc">我们会在24小时内给您安排签约医生 请耐心等待！</p>
              </div>
          </div>
      </div>
      <div v-show="false" class="apply-error">
        <div class="icon-box box-wrap">
          <div class="icon-box__ctn">
              <p class="icon-box__desc ao-desc fw ag">您提交的签约申请未获通过，原因如下：</p>
              <p class="icon-box__desc ao-desc ag">
                  尊敬的用户您好，您的签约申请因为尚未达到签约要求，请再接再厉没有通过申请。希望您继续努力哦！
              </p>
              <a href="javascript:;" class="weui-btn weui-btn_plain-default submit-button">重新申请</a>
          </div>
         </div>
      </div>
  </div>
</template>

<script>
  import VuePickers from '~/mkApp/widget/picker'
  import {provs_data, citys_data, dists_data} from '~/mkApp/utils/areaData.js'
  export default {
    name: "Foo",
    components: {
      VuePickers
    },
    data() {
      return {
        section: 'test Blue',
        selectCity: '请选择',
        selectHot: '请选择',
        showPickCity: false,
        showPickList: false,
        onceShow: false,
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
        pickCityData: {
          columns: 3,
          link: true,
          pData1: provs_data,
          pData2: citys_data,
          pData3: dists_data,
        },
      }
    },
    methods: {
      closeList() {
        var me = this;
        setTimeout(() => {
          me.onceShowList = false;
        }, 500)
        this.showPickList = false;
      },
      confirmList(data){
        var str = `${data.select1.text}`
        this.selectHot = str
        this.closeList();
      },
      showList() {
        this.onceShowList = true;
        this.showPickList = true;
      },
      closeCity() {
        var me = this;
        setTimeout(() => {
          me.onceShow = false;
        }, 500)
        this.showPickCity = false;
      },
      confirmCity(data) {
        console.log(data);
        var str = `${data.select1.text}-${data.select2.text}-${data.select3.text}`
        this.selectCity = str
        this.closeCity();
      },
      showCity() {
        this.onceShow = true;
        this.showPickCity = true;
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
    .pt {
       padding-top: 12px;
    }
    .pane .clt {
      margin-top:0;
    }
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
    .apply {
      height: 100%;
    }
    .pane {
      background: white;
    }
    .title {
      margin-top: .37rem;
      font-weight: bold;
      color: black;
      font-size: 22px;
    }
    .choose {
      position: absolute;
      right: 60px;
    }
</style>