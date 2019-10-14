<template>
  <div class="card">
    <div class="card-header d-flex ai-center p-t-3 p-b-3 m-b-4"
         :class="{'border-bottom-1':!plain}">
      <!-- unicode在插值表达式中会作为文本显示，不会转义，相当于v-text所以用v-html -->
      <i class="iconfont"
         v-html="icon"></i>
      <div class="fs-xxl flex-1"
           :class="{'px-2':!plain}">{{title}}</div>
      <i class="iconfont"
         v-if="!plain">&#xe672;</i>
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
    icon: { type: String, required: true },
    //当外部使用该组件时传入了plain，就不显示下框线和右边的图标
    plain: { type: Boolean }
  }
}
</script>
<style>
</style>