<template>
	<div id="loadingToast" :class="load ? 'show' : 'hide'">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i :class="{'weui-loading': loading, 'weui-icon-success-no-circle': success, 'weui-icon-warn': error}" class="weui-icon_toast"></i>
            <p class="weui-toast__content">{{text}}</p>
        </div>
    </div>
</template>
<script>
  export default {
    name: "Loading",
    props: {
      load: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      success: {
        type: Boolean,
        default: false
      },
      error: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        section: 'test Found'
      }
    }
  }
</script>
<style scoped>
  .weui-icon-warn {
    font-size: 35px;
    margin-bottom: 15px;
  }
	.hide {
		opacity: 0; display: none;
	}
	.show {
		opacity: 1;
		display: block;
	}
  .weui-toast__content {
    font-size: 12px;
  }
</style>