<template>
  <div id="app">
    <div id="particles"></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    // 增加背景动画
    particlesJS.load('particles', 'static/particles.json');
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  width:100%;
  /*padding-bottom: 10px;*/
}
html, body {
  width: 100%;
  /*height: 100%;*/
  margin: 0;
  padding: 0;
}
#particles{
      position: fixed;
      top: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-image: url('./assets/bb.jpg');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50% 50%;
}
</style>
