<template>
  <div>
    <h1>{{id?'编辑':'新建'}}文章</h1>
    <!-- 阻止默认回车提交 -->
    <el-form @submit.native.prevent='save'>
      <el-form-item label="所属分类">
        <!-- 同一文章可能属于多个分类 -->
        <el-select v-model="model.categories"
                   multiple>
          <!-- label是下拉菜单的显示，value是选中的下拉菜单代表的值 -->
          <!-- 这里选中的下拉菜单传给后台的是id -->
          <el-option v-for="item in categories"
                     :key="item._id"
                     :label="item.name"
                     :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <!-- 详情是一个富文本编辑器 -->
      <el-form-item label="详情">

      </el-form-item>
      <vue-editor v-model="model.body"
                  useCustomImageHandler
                  @image-added="handleImageAdded">
      </vue-editor>
      <el-button type="primary"
                 native-type="submit">
        保存
      </el-button>
    </el-form>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  props: {
    id: {}
  },
  data () {
    return {
      model: {},
      categories: [],
    }
  },
  methods: {
    async save () {
      //新建和编辑保存的功能
      //保存的时候做条件判断，如果有id，就执行put方法，没有就post新建分类
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.model)
        this.$router.push('/articles/list')
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      } else {
        await this.$http.post('rest/articles', this.model)
        this.$router.push('/articles/list')
        this.$message({
          message: '创建成功',
          type: 'success'
        })
      }

    },
    async fetch () {
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model = res.data
    },
    //获取上级菜单列表，上级菜单列表的数量就是分类列表的数量
    async fetchCategories () {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    //自定义富文本编辑器的上传图片功能
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      // 要上传图片必须以表单格式提交
      const formData = new FormData();
      //字段名对应upload.single(),必须为file
      formData.append("file", file);

      const res = await this.$http.post('/upload', formData)
      //在光标位置插入一个图片，图片地址就是res.data.url
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();

    }


  },
  created () {
    //如果有id(表明点击编辑跳转过来的）才获取对应id的数据信息
    this.id && this.fetch()
    //获取文章分类列表
    this.fetchCategories()
  }
}
</script>
<style lang="">
</style>