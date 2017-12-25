<template>
	<div class="notFond">
		<h1><i>!</i>暂未开放</h1>
	</div>
</template>
<script>
  export default {
    name: "NotFound",
    data() {
      return {
        section: 'test Found'
      }
    }
  }
</script>
<style scoped>
	h1 {
		font-size: 60px;
	}
	.notFond{
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.notFond i{
		display: block;
		height: 20px;
		width: 20px;
		border-radius: 100%;
		background: #dd524d;
	}
</style>