<template>
  <div id="App">
    <Loading :load="isLoading.load" :loading="isLoading.load" :text="isLoading.text"></Loading>
    <Loading :load="isLoading.error" :error="isLoading.error" :text="isLoading.errorText"></Loading>
    <Loading :load="isLoading.success" :success="isLoading.success" :text="isLoading.text"></Loading>
    <transition name="fade" mode="out-in">
        <router-view v-wechat-title="$route.meta.title"></router-view>
    </transition>
  </div>
</template>

<script>
  import Loading from '~/mkApp/widget/Loading'
  import { mapState } from 'vuex'

  export default {
    name: "App",
    components: {
      Loading
    },
    computed: {
      ...mapState({
        isLoading: state => state.isLoading
      })
    },
    data() {
      return {
        section: 'test section'
      }
    }
  }
</script>
<style src="~/mkApp/weiui.css"></style>
<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0
  }
  #App {
      background: rgb(244, 248, 252);
      height: 100%;
  }
  .active {
    color: orange;
    background: blue;
  }
  body,html{
    height: 100%;
  }
</style>