<template>
  <div class="card">
    <div class="card-header d-flex ai-center p-t-3 p-b-3 m-b-4">
      <!-- unicode在插值表达式中会作为文本显示，不会转义，相当于v-text所以用v-html -->
      <i class="iconfont"
         v-html="icon"></i>
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