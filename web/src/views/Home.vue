<template>
  <div class="home">
    <div class="swiper-container">
      <swiper :options="swiperOption"
              class="swiper">
        <swiper-slide><img src="../assets/1.jpeg"
               alt=""
               class="w100"></swiper-slide>
        <swiper-slide><img src="../assets/2.jpeg"
               alt=""
               class="w100"></swiper-slide>
        <swiper-slide><img src="../assets/3.jpeg"
               alt=""
               class="w100"></swiper-slide>
        <div class="swiper-pagination"
             slot="pagination"></div>
      </swiper>
    </div>
    <div class="icons-container">
      <!-- 开始图标 -->
      <div class="nav-icons bg-white m-t-2 p-t-3 p-b-3 d-flex flex-wrap">
        <div class="icon  m-b-5 border-right d-flex flex-column jc-center ai-center"
             v-for="n in 11"
             :key="n">
          <i class="sprite sprite-news"></i>
          <div class="fs-md text-grey ">爆料站</div>
        </div>
      </div>
      <!-- 结束图标 -->
      <div class="fs-md text-center bg-grey-light folding">
        <i class="sprite sprite-arrows"></i>
        收起
      </div>
    </div>
    <!-- 图标区域结束 -->
    <!-- 卡片组件 -->
    <!-- 新闻列表 -->
    <m-list-card icon="&#xe672;"
                 title="新闻资讯"
                 :categories="newsCats"
                 class="py-3 px-6 bg-white mt-3">
      <!-- 把home主页的数据传给子组件，子组件循环的时候再把数据通过具名slot绑定传到home又进行循环展示 -->
      <!-- 父组件不通过循环就拿到子组件循环后的每个category -->
      <template #items="{category}">
        <router-link tag="div"
                     :to="`/articles/${news._id}`"
                     v-for="(news,i) in category.newsList"
                     :key="i"
                     class="m-t-5 d-flex">
          <span class="text-tip">[{{news.categoryName}}]</span>
          <span class="mx-1">|</span>
          <span class='flex-1 text-ellipsis'>{{news.title}}</span>
          <span class="m-l-1">{{news.createdAt|date}}</span>
        </router-link>

      </template>

    </m-list-card>

    <!-- 英雄列表 -->
    <m-list-card icon="&#xe672;"
                 title="英雄列表"
                 :categories="heroCats"
                 class="py-3 px-6 bg-white mt-3">
      <template #items="{category}">
        <div class="d-flex flex-wrap  avatar-container">
          <router-link tag="div"
                       :to="`/heroes/${hero._id}`"
                       v-for="(hero,i) in category.heroList"
                       :key="i"
                       class="m-t-5 wrapper">
            <div class="d-flex text-center flex-column">
              <img :src="hero.avatar"
                   alt=""
                   width="100%">
              <div>{{hero.name}}</div>
            </div>

          </router-link>
        </div>

      </template>

    </m-list-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      swiperOption: {
        autoplay: true, //可设置数值来指定播放速度
        speed: 400,  // 切换图片速度
        loop: true,
        pagination: {
          el: '.swiper-pagination',
        }
      },
      newsCats: [
        // {
        //   name: '热门',
        //   newsList: new Array(5).fill({}).map(v => ({
        //     categoryName: '公告',
        //     title: 'fsfdsfdsfdsf',
        //     date: '10/10'
        //   }))
        // },

      ],
      heroCats: []
    }
  },
  filters: {
    date (val) {
      return moment(val).format('MM/DD')
    }
  },
  created () {
    this.fetchNewsCats()
    this.fetchHeroCats()

  },
  methods: {
    async fetchNewsCats () {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchHeroCats () {
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data

    }
  },
}
</script>
<style lang="stylus" scoped>
.home >>> .swiper-pagination-bullet {
  width: 0.17rem;
  height: 0.17rem;
  border-radius: 0;
  background-color: #fff;
  opacity: 1;
}

.home >>> .swiper-pagination-bullet-active {
  background-color: #4B67AF;
}

.swiper {
  height: 330px;
}

.swiper-pagination {
  margin-left: 40%;
}

.icons-container {
  .nav-icons {
    .icon {
      width: 25%;
    }

    .icon:nth-of-type(4n) {
      border-right: none;
    }
  }

  .sprite {
    background: url('../assets/sprite.png') no-repeat 0 0;
    background-size: 7.5rem 9.1rem;
    display: inline-block;

    &.sprite-news {
      background-position: 63.546% 15.517%;
      width: 0.52rem;
      height: 0.42rem;
    }

    &.sprite-arrows {
      background-position: 38.577% 52.076%;
      width: 0.2rem;
      height: 0.2rem;
    }
  }

  .folding {
    height: 0.6rem;
    line-height: 0.6rem;
  }
}

.avatar-container {
  .wrapper {
    width: 18%;
    margin-right: 0.134rem;
  }
}
</style>
