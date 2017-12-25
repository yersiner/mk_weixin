<template>
  <div id="App">
    <!-- 
    <h1>Hello App!</h1>
    -->
      <!-- use router-link component for navigation. -->
      <!-- specify the link by passing the `to` prop. -->
      <!-- `<router-link>` will be rendered as an `<a>` tag by default -->

      <!-- 
      <router-link to="/foo">Go to Foo</router-link>
      <router-link to="/bar">Go to Bar</router-link>
      <router-link to="/user/1">Go to user1</router-link>
      <router-link to="/user/2">Go to user2</router-link>
    -->
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
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