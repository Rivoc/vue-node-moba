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
      <div class="nav-icons bg-white m-t-2 p-t-3 d-flex flex-wrap">
        <div class="icon text-center m-b-3 border-right"
             v-for="n in 11"
             :key="n">
          <i class="sprite sprite-news"></i>
          <div class="fs-md text-grey">爆料站</div>
        </div>
      </div>
      <!-- 结束图标 -->
      <div class="fs-md text-center bg-grey-light folding">
        <i class="sprite sprite-arrows"></i>
        收起
      </div>
    </div>
    <!-- 图标区域结束 -->
    <!-- 卡片 -->
    <m-card title="新闻资讯"
            icon="
\ue672">
      <div class="nav d-flex jc-between fs-lg">
        <div class="nav-item">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">公告</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">活动</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">赛事</div>
        </div>
      </div>

      <div class="p-t-3">
        <swiper>
          <swiper-slide v-for="n in 5"
                        :key="n"
                        class="fs-xl">
            <div>
              <span>新闻</span>
              <span>|</span>
              <span>阿斯顿撒多撒大多多多多多多多多</span>
              <span>10/10</span>
            </div>
            <div>
              <span>新闻</span>
              <span>|</span>
              <span>阿斯顿撒多撒大多多多多多多多多</span>
              <span>10/10</span>
            </div>
            <div>
              <span>新闻</span>
              <span>|</span>
              <span>阿斯顿撒多撒大多多多多多多多多</span>
              <span>10/10</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>

  </div>
</template>

<script>
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
      }
    }
  }
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
</style>
