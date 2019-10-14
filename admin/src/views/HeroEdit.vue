<template>
  <div>
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <!-- 阻止默认回车提交 -->
    <el-form @submit.native.prevent='save'>

      <!-- 基本信息一栏 -->
      <el-tabs value="basic">
        <el-tab-pane label="基本信息"
                     name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <!-- action 上传的接口地址 -->
            <el-upload class="avatar-uploader"
                       :action="uploadUrl"
                       :headers="getAuthHeaders()"
                       :show-file-list="false"
                       :on-success="afterUpload">
              <img v-if="model.avatar"
                   :src="model.avatar"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 英雄大图 -->
          <el-form-item label="Banner">
            <!-- action 上传的接口地址 -->
            <el-upload class="avatar-uploader"
                       :action="uploadUrl"
                       :headers="getAuthHeaders()"
                       :show-file-list="false"
                       :on-success="res=>model.banner=res.url">
              <img v-if="model.banner"
                   :src="model.banner"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="model.categories"
                       multiple>
              <el-option v-for="item of categories"
                         :label="item.name"
                         :value="item._id"
                         :key="item._id"></el-option>
            </el-select>
          </el-form-item>

          <!-- 评分 -->
          <el-form-item label="难度">
            <el-rate style="margin-top:0.6rem"
                     :max="9"
                     show-score
                     v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate style="margin-top:0.6rem"
                     :max="9"
                     show-score
                     v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate style="margin-top:0.6rem"
                     :max="9"
                     show-score
                     v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate style="margin-top:0.6rem"
                     :max="9"
                     show-score
                     v-model="model.scores.survive"></el-rate>
          </el-form-item>

          <!-- 装备选择 -->
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1"
                       multiple>
              <el-option v-for="item of items"
                         :label="item.name"
                         :value="item._id"
                         :key="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2"
                       multiple>
              <el-option v-for="item of items"
                         :label="item.name"
                         :value="item._id"
                         :key="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea"
                      v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea"
                      v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea"
                      v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>

        <!-- 技能一栏 -->
        <el-tab-pane label="技能">
          <el-button type="text"
                     @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
          <el-row type="flex"
                  style="flex-wrap:wrap"
                  :gutter="100">
            <!-- 中等屏幕下一行写两个技能 -->
            <el-col :md="
                  12"
                    v-for="(item,i) in model.skills"
                    :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <!-- 为什么用$set?
受现代 JavaScript 的限制，Vue 不能检测到对象属性的添加或删除。由于 Vue 会在初始化实例时对属性遍历执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的
官方文档定义：如果在实例创建之后添加新的属性到实例上，它不会触发视图更新
简单说就是一开始data里没有声明icon，后续新增属性是无法触发更新视图的
使用方法
this.$set(Object, key, value)-->
                <el-upload class="avatar-uploader"
                           :action=" uploadUrl"
                           :headers="getAuthHeaders()"
                           :show-file-list="false"
                           :on-success="res=>$set(item,'icon',res.url)">
                  <img v-if="item.icon"
                       :src="item.icon"
                       class="avatar">
                  <i v-else
                     class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea"
                          v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea"
                          v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button sizee="small"
                           type="danger"
                           @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 最佳搭档 -->
        <el-tab-pane label="最佳搭档"
                     name="partners">
          <el-button type="text"
                     @click="model.partners.push({})"><i class="el-icon-plus"></i>添加搭档
          </el-button>
          <el-row type="flex"
                  style="flex-wrap:wrap"
                  :gutter="100">
            <el-col :md="
                  12"
                    v-for="(item,i) in model.partners"
                    :key="i">
              <el-form-item label="英雄">
                <!-- filterable 可以搜索的下拉框 -->
                <el-select filterable
                           v-model="item.hero">
                  <el-option v-for="hero in heroes"
                             :key="hero._id"
                             :value="hero._id"
                             :label="hero.name"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description"
                          type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button sizee="small"
                           type="danger"
                           @click="model.partners.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

      </el-tabs>

      <el-button type="primary"
                 native-type="submit">
        保存
      </el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: {}
  },
  data () {
    return {
      categories: [],
      items: [],
      heros: [],
      model: {
        name: '',
        avatar: '',
        banner: '',
        partners: '',
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0
        },
        skills: []
      },

    }
  },
  methods: {
    async save () {
      //新建和编辑保存的功能
      //保存的时候做条件判断，如果有id，就执行put方法，没有就post新建分类
      if (this.id) {
        await this.$http.put(`rest/heroes/${this.id}`, this.model)
        this.$router.push('/heroes/list')
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      } else {
        await this.$http.post('rest/heroes', this.model)
        this.$router.push('/heroes/list')
        this.$message({
          message: '创建成功',
          type: 'success'
        })
      }

    },
    async fetch () {
      const res = await this.$http.get(`rest/heroes/${this.id}`)
      //如果直接赋值就会重置this.model,如果res.data里没有this.model里的一些字段，就会出问题
      //Object.assign的使用Object.assign(targetObj, sourceObj1, sourceObj2);将source的所有可枚举属性合并到target对象 浅拷贝
      this.model = Object.assign({}, this.model, res.data)
    },
    //请求英雄分类
    async fetchCategories () {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    //请求出装装备
    async fetchItems () {
      const res = await this.$http.get(`rest/items`)
      this.items = res.data
    },
    //提交事件
    afterUpload (res) {
      //显式赋值
      // this.$set(this.model, 'avatar', res.url)
      this.model.avatar = res.url
    },
    //获取所有英雄数据
    async fetchHeroes () {
      const res = await this.$http.get('rest/heroes')
      this.heroes = res.data

    }
  },
  created () {
    //如果有id(表明点击编辑跳转过来的）才获取对应id的数据信息
    this.id && this.fetch()
    this.fetchCategories()
    this.fetchItems()
    this.fetchHeroes()


  }
}
</script>
<style>
</style>