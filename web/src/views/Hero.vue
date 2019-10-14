<template>
  <div v-if="model">
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

    <!-- banner区域 -->

    <div class="banner "
         :style="{'background-image':`url(${model.banner})`}">
      <div class="mask d-flex ai-end jc-between fs-mmd px-5 py-5 w100 h100">
        <div class="info text-white">
          <div>{{model.title}}</div>
          <div class="fs-xxxl"><strong>{{model.name}}</strong></div>
          <div>{{model.categories.map(v=>v.name).join('/')}}</div>

          <div v-if="model.scores"
               class="fs-md scores">
            <span>难度</span>
            <span class="bg-o-brown">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="bg-o-blue">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="bg-o-red">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="bg-o-grey">{{model.scores.survive}}</span>
          </div>
        </div>
        <div class="text-grey">皮肤&gt;</div>
      </div>
    </div>

    <!-- 头部结束 -->
    <div>
      <!-- 导航 -->
      <div class="px-3 px-2 bg-white">
        <div class="nav d-flex py-2 jc-around border-bottom-1 ">
          <div class="nav-item active">
            <div class="nav-link p-b-1">英雄初识</div>
          </div>
          <div class="nav-item ">
            <div class="nav-link p-b-1">进阶攻略</div>
          </div>
        </div>
      </div>
      <!-- end of nav -->
      <swiper>
        <swiper-slide>
          <div>
            <!-- 技能介绍部分 -->
            <!-- 头部 -->
            <div class="py-3 px-3 bg-white">
              <div class="button d-flex">
                <router-link tag="button"
                             to="/"
                             class="flex-1 lg-btn fs-lg">
                  <i class="iconfont text-theme-color">&#xe977;</i>英雄介绍视频
                </router-link>
                <router-link tag="button"
                             to="/"
                             class="flex-1 lg-btn fs-lg m-l-3">
                  <i class="iconfont text-theme-color">&#xe606;</i>一图识英雄
                </router-link>
              </div>
              <!-- 技能介绍详情 -->
              <!-- 技能图标 -->
              <div class="skills d-flex m-t-7 jc-between ai-center">
                <div v-for="(skill,index) in model.skills"
                     :key="index">
                  <div>
                    <img :src="skill.icon"
                         alt=""
                         :class="[{btnActive:(currentBtn===index)},'skillBtn']"
                         @click="changeBtnIndex(index)">
                  </div>
                </div>
              </div>
              <!-- 技能名称、描述 -->
              <div v-if="currentSkill">
                <div class="d-flex jc-between ai-center">
                  <p class="hero-tit text-skillName fs-xl">{{currentSkill.name}}</p>
                  <span class="flex-1 fs-mmd text-grey m-l-5">(冷却值：{{currentSkill.delay}}消耗：{{currentSkill.cost}})</span>
                </div>

                <div class="border-bottom-1 p-b-3 skillDesc">
                  {{currentSkill.description}}
                </div>
                <div class="text-grey m-t-5 skillDesc">
                  小提示：{{currentSkill.tips}}
                </div>
              </div>
            </div>
            <!-- 技能详情结束 -->

            <!-- 出装推荐 -->
            <m-card plain
                    icon="&#xe69d;"
                    title="出装推荐"
                    class="m-t-3 hero-tit py-3 px-3 bg-white">
              <div class="fs-xl">顺风出装</div>
              <section class="d-flex jc-between m-t-3">
                <div v-for="(item,index) in model.items1"
                     :key="index"
                     class="text-center">
                  <img :src="item.icon"
                       alt=""
                       style="border-radius:50%">
                  <div class="fs-mmd">{{item.name}}</div>
                </div>
              </section>
              <div class="fs-xl m-t-3">逆风出装</div>
              <section class="d-flex jc-between m-t-3">
                <div v-for="(item,index) in model.items2"
                     :key="index"
                     class="text-center">
                  <img :src="item.icon"
                       alt=""
                       style="border-radius:50%">
                  <div class="fs-mmd">{{item.name}}</div>
                </div>
              </section>
            </m-card>

            <!-- 使用技巧 -->
            <m-card plain
                    icon="&#xe69d;"
                    title="使用技巧"
                    class="m-t-3 hero-tit py-3 px-3 bg-white">
              <div>{{model.usageTips}}</div>
            </m-card>
            <m-card plain
                    icon="&#xe69d;"
                    title="对抗技巧"
                    class="m-t-3 hero-tit py-3 px-3 bg-white">
              <div>{{model.battleTips}}</div>
            </m-card>
            <m-card plain
                    icon="&#xe69d;"
                    title="英雄关系"
                    class="m-t-3 hero-tit py-3 px-3 bg-white ">
              <div class="border-bottom-1 p-b-5">
                <div class="fs-xl m-b-3">最佳搭档</div>
                <div v-for="item in model.partners"
                     :key="item.name"
                     class="d-flex p-b-3 ">
                  <img :src="item.hero.avatar"
                       alt=""
                       width=auto
                       height=96>
                  <div class="m-l-3">{{item.description}}</div>
                </div>
              </div>
              <div class="border-bottom-1 p-b-5 m-t-3">
                <div class="fs-xl m-b-3">被谁克制</div>
                <div v-for="item in model.partners"
                     :key="item.name"
                     class="d-flex p-b-3 ">
                  <img :src="item.hero.avatar"
                       alt=""
                       width=auto
                       height=96>
                  <div class="m-l-3">{{item.description}}</div>
                </div>
              </div>
            </m-card>

          </div>

        </swiper-slide>
        <swiper-slide></swiper-slide>

      </swiper>
    </div>

  </div>

</template>
<script>
export default {
  props: {
    id: { required: true }
  },
  data () {
    return {
      model: {},
      currentBtn: 0
    }
  },
  methods: {
    async fetchHero () {
      const res = await this.$http.get(`heroes/${this.id}`)
      this.model = res.data
      console.log(res.data)
    },
    changeBtnIndex (index) {
      this.currentBtn = index
    }
  },
  created () {
    this.fetchHero()
  },
  computed: {
    currentSkill () {
      return this.model.skills[this.currentBtn]
    }


  }
}
</script>
<style lang="stylus" scoped>
.banner {
  width: 100%;
  height: 3.82rem;
  background: #fff no-repeat top center;
  background-size: 100% 100%;
  background-color: #fff;

  .mask {
    background: linear-gradient(to bottom, rgba(76, 76, 76, 0) 5%, rgba(19, 19, 19, 1) 100%);

    div, span {
      margin-top: 0.01rem;
    }
  }

  .bg-o-brown, .bg-o-red, .bg-o-blue, .bg-o-grey {
    display: inline-block;
    width: 0.28rem;
    height: 0.28rem;
    text-align: center;
    opacity: 0.9;
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    border-radius: 50%;
  }
}

.skillBtn {
  border: 6px solid transparent;
}

.hero-tit {
  font-family: Microsoft YaHei;
  font-weight: bold;

  * {
    font-weight: normal;
  }
}

.skillDesc {
  line-height: 1.5em;
}
</style>