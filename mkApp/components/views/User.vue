<template>
  <div id="user">
    <h1>{{title}}Hello Usernice {{$route.params.id}}!</h1>
  </div>
</template>

<script>
  export default {
    name: "user",
    data() {
      return {
        title: 'userInfo'
      }
    },
    watch: {
        '$route' (to, from) {
          // react to route changes...
          console.log('to', to);
          console.log('from', from);
        }
    },
    beforeRouteUpdate (to, from, next) {
      // react to route changes...
      // don't forget to call next()
      console.log('before+from', from);
      next();
    }
  }
</script>

<style scoped>
    #bar {
      background: orange;
    }
</style>