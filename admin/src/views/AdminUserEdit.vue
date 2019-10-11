<template>
  <div>
    <h1>{{id?'编辑':'新建'}}管理员</h1>
    <!-- 阻止默认回车提交 -->
    <el-form @submit.native.prevent='save'>
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password"
                  v-model="model.password"></el-input>
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
      model: {}
    }
  },
  methods: {
    async save () {
      //新建和编辑保存的功能
      //保存的时候做条件判断，如果有id，就执行put方法，没有就post新建分类
      if (this.id) {
        await this.$http.put(`rest/admin_users/${this.id}`, this.model)
        this.$router.push('/admin_users/list')
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      } else {
        await this.$http.post('rest/admin_users', this.model)
        this.$router.push('/admin_users/list')
        this.$message({
          message: '创建成功',
          type: 'success'
        })
      }

    },
    async fetch () {
      const res = await this.$http.get(`rest/admin_users/${this.id}`)
      this.model = res.data
    }


  },
  created () {
    //如果有id(表明点击编辑跳转过来的）才获取对应id的数据信息
    this.id && this.fetch()


  }
}
</script>
<style lang="">
</style>