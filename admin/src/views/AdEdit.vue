<template>
  <div>
    <h1>{{id?'编辑':'新建'}}广告位</h1>
    <!-- 阻止默认回车提交 -->
    <el-form @submit.native.prevent='save'>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告">

      </el-form-item>
      <el-button type="text"
                 @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
      <el-row type="flex"
              style="flex-wrap:wrap"
              :gutter="100">
        <!-- 中等屏幕下一行写一个广告 -->
        <el-col :md="
                  24"
                v-for="(item,i) in model.items"
                :key="i">
          <el-form-item label="跳转链接">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="图片"
                        style="margin-top:0.5rem">
            <el-upload class="avatar-uploader"
                       :action="$http.defaults.baseURL +'/upload'"
                       :show-file-list="false"
                       :on-success="res=>$set(item,'image',res.url)">
              <img v-if="item.image"
                   :src="item.image"
                   class="img">
              <i v-else
                 class="el-icon-plus img-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button sizee="small"
                       type="danger"
                       @click="model.items.splice(i,1)">删除</el-button>
          </el-form-item>
        </el-col>

      </el-row>
      <el-button type="primary"
                 native-type="submit">
        保存
      </el-button>
    </el-form>
  </div>
</template>
<script>
import '../common/style/style.css'
export default {
  props: {
    id: {}
  },
  data () {
    return {
      model: {
        items: []
      },
    }
  },
  methods: {
    async save () {
      //新建和编辑保存的功能
      //保存的时候做条件判断，如果有id，就执行put方法，没有就post新建分类
      if (this.id) {
        await this.$http.put(`rest/ads/${this.id}`, this.model)
        this.$router.push('/ads/list')
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      } else {
        await this.$http.post('rest/ads', this.model)
        this.$router.push('/ads/list')
        this.$message({
          message: '创建成功',
          type: 'success'
        })
      }

    },
    async fetch () {
      const res = await this.$http.get(`rest/ads/${this.id}`)
      //因为服务端一开始的返回数据不包含item(广告数据),直接赋值会把this.model覆盖，使得新增广告方法报错，用合并的方法解决
      this.model = Object.assign({}, this.model, res.data)
    }

  },
  created () {
    //如果有id(表明点击编辑跳转过来的）才获取对应id的数据信息
    this.id && this.fetch()
    //获取上级分类列表
  }
}
</script>
<style scoped>
.img-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  height: 9rem;
  line-height: 9rem;
  text-align: center;
}
.img {
  height: 9rem;
  display: block;
}
</style>
