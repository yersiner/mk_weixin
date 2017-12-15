<template>
    <div id="reject">
        <div class="apply-error">
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
  export default {
    name: "Reject",
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
    #reject {
      height: 100%;
    }
</style>