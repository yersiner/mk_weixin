<template>
	<div class="container-wrapper">
	       <div class="item" v-for="i in 8">{{num[i-1]}}</div>
	       <input @input="$emit('update:numbers', $event.target.value)" v-model="num" maxlength="8" autofocus="autofocus"/>
	</div>
</template>
<script>
	export default {
		props: ['numbers'],
		data() {
			return {
				num: this.numbers
			}
		}
	}
</script>
<style scoped>
	.container-wrapper {
	  position: relative;
	  margin: auto;
	  height: 40px;
	  width: 100%;
	  display: flex;
	  display: -webkit-flex;
	}

	.item { 
	  background: white;
	  margin-left:14px;
	  flex-basis: 8.8%;
	  font-size: 40px;
	  text-align: center;
	  line-height: 40px;
	  -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.2);  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
	  -moz-box-shadow:    0px 0px 3px 1px rgba(0,0,0,0.2);  /* Firefox 3.5 - 3.6 */
	  box-shadow:         0px 0px 3px 1px rgba(0,0,0,0.2);  /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
	}
	.item:not(:last-of-type) {
	  
	}

	input {
      position: absolute;
      height: 90px;
      opacity: 0;
      left: 10px;
      width: 95%;
      bottom: -10px;
	}
</style>