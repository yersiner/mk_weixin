<template>
  <div id="bar">
    <h1>Hello Bar!</h1>
  </div>
</template>

<script>
  export default {
    name: "Bar",
    data() {
      return {
        section: 'test Bar'
      }
    }
  }
</script>

<style scoped>
    #bar {
      background: orange;
    }
</style>