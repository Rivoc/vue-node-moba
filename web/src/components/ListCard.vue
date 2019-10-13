<template>
  <m-card :title="title"
          :icon="
           icon"
          class="m-t-5">
    <div class="nav d-flex jc-between fs-lg">
      <div class="nav-item m-r-2"
           :class="{active:(active===index)}"
           v-for="(category,index) in categories"
           :key="index"
           @click="$refs.list.swiper.slideTo(index)">
        <div class="nav-link">{{category.name}}</div>
      </div>

    </div>

    <div class="p-t-3">
      <swiper ref="list"
              @slide-change="()=>active=$refs.list.swiper.realIndex">
        <swiper-slide v-for="(category,index) in categories"
                      :key="index"
                      class="fs-xl">
          <slot name="items"
                :category="category"></slot>

        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>
<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data () {
    return {
      active: 0
    }
  }


}
</script>
<style lang="stylus" scoped>
@import '../reset.styl';

.active {
  color: colors.theme-color;
  border-bottom: 3px solid colors.theme-color;
}
</style>