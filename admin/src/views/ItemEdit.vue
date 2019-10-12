<template>
  <div>
    <h1>{{id?'编辑':'新建'}}物品</h1>
    <!-- 阻止默认回车提交 -->
    <el-form @submit.native.prevent='save'>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!-- action 上传的接口地址 -->
        <el-upload class="avatar-uploader"
                   :action="uploadUrl"
                   :headers="getAuthHeaders()"
                   :show-file-list="false"
                   :on-success="afterUpload">
          <img v-if="model.icon"
               :src="model.icon"
               class="avatar">
          <i v-else
             class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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

    }
  },
  methods: {
    async save () {
      //新建和编辑保存的功能
      //保存的时候做条件判断，如果有id，就执行put方法，没有就post新建分类
      if (this.id) {
        await this.$http.put(`rest/items/${this.id}`, this.model)
        this.$router.push('/items/list')
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      } else {
        await this.$http.post('rest/items', this.model)
        this.$router.push('/items/list')
        this.$message({
          message: '创建成功',
          type: 'success'
        })
      }

    },
    async fetch () {
      const res = await this.$http.get(`rest/items/${this.id}`)
      this.model = res.data
    },
    afterUpload (res) {
      //显式赋值
      this.$set(this.model, 'icon', res.url)
      // this.model.icon=res.url
    }
  },
  created () {
    //如果有id(表明点击编辑跳转过来的）才获取对应id的数据信息
    this.id && this.fetch()


  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>