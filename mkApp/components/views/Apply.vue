<template>
  <div class="apply">
      <div v-show="status === 3" class="apply-error">
        <div class="icon-box box-wrap">
          <div class="icon-box__ctn">
              <p class="icon-box__desc ao-desc fw ag">您提交的签约申请未获通过，原因如下：</p>
              <p class="icon-box__desc ao-desc ag">
                  尊敬的用户您好，您的签约申请因为尚未达到签约要求，请再接再厉没有通过申请。希望您继续努力哦！
              </p>

              <a href="javascript:;" @click="ReApply()" class="weui-btn weui-btn_plain-default submit-button">重新申请</a>
          </div>
         </div>
      </div>
      <div v-show="status === 1" class="apply-success">
          <div class="icon-box box-wrap">
              <i class="weui-icon-success weui-icon_msg theme"></i>
              <div class="icon-box__ctn">
                  <h3 class="icon-box__title mt">提交成功</h3>
                  <p class="icon-box__desc ico-desc">我们会在24小时内给您安排签约医生 请耐心等待！</p>
              </div>
          </div>
      </div>
      <div v-show="status === -1 || status === -10" class="applyform">
          <div class="pane pt">
              <div class="weui-cells__title title clt">基本信息</div>
              <div class=" weui-cells_form">
                  <div class="weui-cell">
                      <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
                      <div class="weui-cell__bd">
                          <input v-model="name" class="weui-input" placeholder="请输入姓名"/>
                      </div>
                  </div>
                  <div class="weui-cell">
                      <div class="weui-cell__hd">
                          <label class="weui-label">手机号</label>
                      </div>
                      <div class="weui-cell__bd">
                          <input @keyup="checkTel" v-model="phone" class="weui-input" type="number" placeholder="请输入手机号"/>
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
                          <input v-model='fullAddress' class="weui-input" type="tel" placeholder="请输入住址"/>
                      </div>
                  </div>
              </div>
          </div>
          <div class="pane">
              <div class="weui-cells__title title">重点标记人群(多选)</div>
              <div class="weui-cells_form">
                    <div class="weui-cells_checkbox">
                      <label @click="toggleItem(disease, disease.checked)" v-for="(disease,index) in diseaseNum" class="weui-cell weui-check__label" :for="disease.id">
                          <div class="weui-cell__bd">
                              <p>{{disease.name}}</p>
                          </div>
                          <div class="weui-cell__hd">
                              <input v-model="disease.checked" type="checkbox" class="weui-check" name="checkbox1" :id="disease.id">
                              <i class="weui-icon-checked custom-checked"></i>
                          </div>
                      </label>
                  </div>
              </div>
          </div>
          <a @click="submit" href="javascript:;" class="weui-btn weui-btn_plain-default submit-button">提交</a>
          <vue-pickers :hide="onceShow" :show="showPickCity"
          :selectData="pickCityData"
          v-on:cancel="closeCity"
          v-on:confirm="confirmCity"></vue-pickers>
          <vue-pickers :hide="onceShowList" :show="showPickList"
          :selectData="HostList"
          v-on:cancel="closeList"
          v-on:confirm="confirmList"></vue-pickers>
      </div>
  </div>
</template>

<script>
  import VuePickers from '~/mkApp/widget/picker'
  import { mapState } from 'vuex'
  import {provs_data, citys_data, dists_data} from '~/mkApp/utils/areaData.js'
  export default {
    name: "Foo",
    components: {
      VuePickers
    },
    asyncData({store, route}) {
      //获取医院列表
      if(route.params.doctorId !== 'nice') {
         return;
      }
      return store.dispatch('fetchHospitalList').catch(()=>{
         //alert('加载医院列表失败')
         console.log('加载医院列表失败');
      });
      
      //store.dispatch('fetchApplyStatus');
    },
    computed: mapState([
      // map this.count to store.state.count
      'HostList',
      'openId',
      'status'
    ]),
    data() {
      return {
        name: 'gyfnice',
        phone:'13020003856',
        province:'贵州',
        city:'贵阳',
        district:'观山湖',
        fullAddress:'观山湖1号',
        diseaseNum: [
          {
            name:'糖尿病',
            id: 's1',
            value: 0,
            checked: false
          },
          {
            name:'高血压',
            id: 's2',
            value: 1,
            checked: true
          },
          {
            name:'脑梗',
            id: 's3',
            value: 2,
            checked: false
          },
          {
            name:'其他',
            id: 's4',
            value: 3,
            checked: false
          },
        ], //病种
        doctorId: this.$route.params.doctorId === 'nice'? '' : this.$route.params.doctorId,
        hospitalId: '5a28ad70f11d1263b832bf24',
        selectCity: '请选择',
        selectHot: '请选择',
        showPickCity: false,
        showPickList: false,
        onceShow: false,
        onceShowList: false,
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
      ReApply() {
        this.$store.commit('updateStatus', {
          status: -1
        })
        this.$store.dispatch('fetchHospitalList')
      },
      checkTel(event) {
        if(this.phone.length > 11) {
          this.phone = this.phone.slice(0, 11);
        }
      },
      toggleItem(item, checked) {
        item.checked = !item.checked;
      },
      submit() {
         let data = {
            openId: this.openId,
            name: this.name,
            phone: this.phone,
            province: this.province,
            city: this.city,
            district: this.district,
            fullAddress: this.fullAddress,
            diseaseNum: this.diseaseNum.filter((item)=>{
              if(item.checked) {
                return true
              }
            }).map((item) => item.value),
            doctorId: this.doctorId,
            hospitalId: this.hospitalId
         }
         this.$store.dispatch('submitApply', data);
      },
      closeList() {
        var me = this;
        setTimeout(() => {
          me.onceShowList = false;
        }, 500)
        this.showPickList = false;
      },
      confirmList(data){
        console.log(data);
        var str = `${data.select1.text}`
        this.hospitalId = data.select1.value
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
        this.province = data.select1.text
        this.city = data.select2.text
        this.district = data.select3.text

        var str = `${this.province}-${this.city}-${this.district}`
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
    .ag {
      margin-left: -10%;
      font-size:14px;
      word-wrap: break-word;
      text-align:justify;
      text-align:webkit-justify;
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
       
    }
    .pane .clt {
      margin-top:0;
    }
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
    .apply {
      height: 100%;
      padding-bottom:30px;
    }
    .weui-cells_checkbox .weui-check:checked+.custom-checked:before {
      color: #38E6FF;
    }
    .weui-cells_checkbox .weui-check+.weui-icon-checked:before {
        content: "\EA06";
        color: #E9F0F5;
    }
    .pane {
      background: white;
    }
    .title {
      margin-top: 8px;
      margin-bottom: .5em;
      padding-top: 27px;
      font-weight: bold;
      color: black;
      font-size: 22px;
    }
    .choose {
      position: absolute;
      right: 60px;
    }
</style>