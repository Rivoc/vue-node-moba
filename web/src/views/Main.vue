<template>
  <div>
    <div class="topBar bg-black py-2 px-4 d-flex ai-center">
      <img src="../assets/logo.png"
           alt=""
           height="60">
      <div class="px-2 flex-1 mx-3">
        <div class="text-white logo-text fs-sm">王者荣耀</div>
        <div class="text-grey fs-sm">团队成就更多</div>
      </div>
      <button type="button"
              class="btn bg-theme-color text-dark fs-sm">立即下载</button>
    </div>
    <div class="nav bg-theme-color d-flex jc-around ai-center text-white  fs-lg">
      <router-link to="/home"
                   tag="div">首页
      </router-link>
      <router-link to="/gg"
                   tag="div">攻略中心
      </router-link>
      <router-link to="/gg"
                   tag="div">赛事中心
      </router-link>

    </div>
    <router-view></router-view>
  </div>

</template>

<script>
export default {

}
</script>
<style lang="stylus" scoped>
.topBar {
  position: sticky;
  top: 0;
  z-index: 3;
  height: 90px;
}

.btn {
  width: 1.2rem;
  height: 0.48rem;
  line-height: 0.48rem;
  font-weight: bold;
}

.logo-text {
  font-size: 26px;
}

.nav {
  height: 0.84rem;
}

.router-link-active {
  border-bottom: 0.03rem solid #fff;
}
</style>
