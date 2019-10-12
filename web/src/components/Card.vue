<template>
  <div class="card py-3 px-3 bg-white mt-3">
    <div class="card-header d-flex ai-center p-t-3 p-b-3 m-b-4">
      <i class="iconfont">{{icon}}</i>
      <div class="fs-xxl flex-1 px-2">{{title}}</div>
      <i class="iconfont">&#xe672;</i>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true }
  }
}
</script>
<style lang="">
</style>