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
    <router-view></router-view>
  </div>
</template>

<script>
  import '../weiui.css'
  export default {
    name: "App",
    data() {
      return {
        section: 'test section'
      }
    }
  }
</script>
<style>
  #App {
      background: rgb(244, 248, 252);
  }
  .active {
    color: orange;
    background: blue;
  }
</style>