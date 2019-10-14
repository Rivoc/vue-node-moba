<template>
  <!-- 只有Model数据取得了才开始渲染,避免报错 -->
  <div v-if="model">
    <div class="d-flex article-header fs-md border-bottom">
      <i class="iconfont"></i>
      <div class="flex-1 text-article-tit text-ellipsis">{{model.title}}</div>
      <div class="text-article-time m-r-1">2016/10/10</div>
    </div>
    <!-- 文章主体 -->
    <div class="article-body fs-sm py-3 px-5 "
         v-html="model.body">

    </div>
    <!-- 底部链接文章 -->
    <div class="article-related py-3 px-5 fs-md">
      <div class="m-b-5">
        <i class="iconfont"></i><span class="text-article-tit">相关资讯</span>
      </div>

      <router-link tag="div"
                   :to='`/articles/${item._id}`'
                   v-for="(item,index) in model.related"
                   :key="index"
                   class="text-primary-dark m-b-3">
        {{item.title}}
      </router-link>
    </div>

  </div>

</template>
<script>
export default {
  props: {
    id: { requried: true }
  },
  data () {
    return {
      model: {}
    }
  },
  created () {
    this.fetchArticle()
  },
  methods: {
    async fetchArticle () {
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data


    }
  },
  watch: {
    id () {
      this.fetchArticle()
      window.scrollTo(0, 0)
    }
  }
}
</script>
<style lang="stylus" scoped>
.article-header {
  height: 0.64rem;
  line-height: 0.64rem;
}
</style>
