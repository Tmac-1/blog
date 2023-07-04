
<template>
  <div>
     <span>{{obj.test}}</span>
     <HelloWorld :msg="obj.a" />
  </div>
  <Test />
</template>
<script setup lang="ts">
// import { getCurrentInstance } from 'vue'
import { reactive } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test.vue'
// console.log('getCurrentInstance',getCurrentInstance())
// console.log('this',this)
const obj = reactive({
  a: 'hello world111',
  test: 'test'
})

setTimeout(()=>{
  obj.test = 'hello test'
  // obj.a = 'hello world2222'
},3000)


</script>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>