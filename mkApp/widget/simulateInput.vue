<template>
	<div @click="toggleFocus" class="container-wrapper">
	       <div class="item" v-for="i in 8">{{num[i-1]}}</div>
	       <input type="password" ref="input" v-focus @input="$emit('update:numbers', $event.target.value)" v-model="num" maxlength="8"/>
	</div>
</template>
<script>
	export default {
		props: ['numbers'],
		data() {
			return {
				num: this.numbers
			}
		},
		methods: {
			toggleFocus() {
				console.log(8899);
				this.$refs.input.focus()
			}
		},
		directives: {
		  focus: {
		    // 指令的定义
		    inserted: function (el) {
		      setTimeout(function() {
		          el.focus()
		      }, 1000)
		    }
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
	  margin-left:2.6%;
	  flex-basis: 9.5%;
	  font-size: 25px;
	  height: 40px;
	  text-align: center;
	  line-height: 40px;
	  -webkit-box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.2);  /* Safari 3-4, iOS 4.0.2 - 4.2, Android 2.3+ */
	  -moz-box-shadow:    0px 0px 3px 1px rgba(0,0,0,0.2);  /* Firefox 3.5 - 3.6 */
	  box-shadow:         0px 0px 3px 1px rgba(0,0,0,0.2);  /* Opera 10.5, IE 9, Firefox 4+, Chrome 6+, iOS 5 */
	}
	.item:not(:last-of-type) {
	  
	}

	.container-wrapper input {
	  text-indent: -200px;
      position: absolute;
      font-size:24px;
      height: 100px;
      opacity: 0;
      left: -4px;
      width: 100%;
      bottom: -10px;
	}
</style>