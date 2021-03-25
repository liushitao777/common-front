<template>
  <div id="app">
    <transition
      name="fade-transform"
      mode="out-in"
    >

      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss">
  #app{
    /*background: url("./assets/login/slider1.png") no-repeat;*/
    overflow: auto;
    /*background-image: url("./assets/index/background.jpg") !important;*/
    background-position: center 0;
		background-size: 100% 100%;
    background-color: #EBEFF2;
  }
</style>
