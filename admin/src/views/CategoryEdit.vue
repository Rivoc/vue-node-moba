<template>
  <div>
    <h1>{{id?'编辑':'新建'}}分类</h1>
    <!-- 阻止默认回车提交 -->
    <el-form @submit.native.prevent='save'>
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <!-- label是下拉菜单的显示，value是选中的下拉菜单代表的值 -->
          <!-- 这里选中的下拉菜单传给后台的是id -->
          <el-option v-for="item in parentOptions"
                     :key="item._id"
                     :label="item.name"
                     :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
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
      model: {},
      parentOptions: [],
    }
  },
  methods: {
    async save () {
      //新建和编辑保存的功能
      //保存的时候做条件判断，如果有id，就执行put方法，没有就post新建分类
      if (this.id) {
        await this.$http.put(`rest/categories/${this.id}`, this.model)
        this.$router.push('/categories/list')
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      } else {
        await this.$http.post('rest/categories', this.model)
        this.$router.push('/categories/list')
        this.$message({
          message: '创建成功',
          type: 'success'
        })
      }

    },
    async fetch () {
      const res = await this.$http.get(`rest/categories/${this.id}`)
      this.model = res.data
    },
    //获取上级菜单列表，上级菜单列表的数量就是分类列表的数量
    async fetchParentOptions () {
      const res = await this.$http.get(`rest/categories`)
      this.parentOptions = res.data
    }
  },
  created () {
    //如果有id(表明点击编辑跳转过来的）才获取对应id的数据信息
    this.id && this.fetch()
    //获取上级分类列表
    this.fetchParentOptions()
  }
}
</script>
<style lang="">
</style>