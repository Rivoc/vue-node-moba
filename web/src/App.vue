<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
const setView = () => {
  const WIDTH = 750 //设计稿尺寸
  document.documentElement.style.fontSize = (screen.width / WIDTH * 100) + "px"
  console.log(document.documentElement.style.fontSize)
}
document.onorientationchange = setView;
setView()
</script>
<style>
</style>
