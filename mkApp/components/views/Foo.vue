<template>
  <div class="apply">
        <div class="pane">
            <div class="weui-cells__title title">基本信息</div>
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
                <div class="weui-cell weui-cell_select weui-cell_select-after">
                    <div class="weui-cell__hd">
                        <label for="" class="weui-label">地区</label>
                    </div>
                    <div class="weui-cell__bd">
                        <div class="weui-select">
                            <span class="choose">请选择</span>
                        </div>
                    </div>
                </div>
                <div class="weui-cell weui-cell_select weui-cell_select-after">
                    <div class="weui-cell__hd">
                        <label for="" class="weui-label">医院</label>
                    </div>
                    <div class="weui-cell__bd">
                        <div class="weui-select">
                            <span class="choose">请选择</span>
                        </div>
                    </div>
                </div>
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
        <a href="javascript:;" class="weui-btn weui-btn_plain-default">提交</a>
  </div>
</template>

<script>
  export default {
    name: "Foo",
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
    .apply {
      background: rgb(244, 248, 252);
    }
    .pane {
      background: white;
    }
    .title {
      font-weight: bold;
      color: black;
      font-size: 22px;
    }
    .choose {
      position: absolute;
      right: 60px;
    }
</style>