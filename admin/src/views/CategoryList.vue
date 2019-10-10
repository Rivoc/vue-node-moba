<template>
  <div>
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id"
                       label="ID"
                       width="230">
      </el-table-column>
      <el-table-column prop="parent.name"
                       label="上级分类"
                       width="230">
      </el-table-column>
      <el-table-column prop="name"
                       label="分类名称"
                       width="230">
      </el-table-column>
      <el-table-column label=" 操作"
                       width="200">
        <template slot-scope="scope">
          <!-- 每一行数据都可以通过scope.row访问字段 -->
          <el-button type="primary"
                     size="small"
                     @click="$router.push(`/categories/edit/${scope.row._id}`)">编辑
          </el-button>
          <el-button type="primary"
                     size="small"
                     @click="remove(scope.row)">删除
          </el-button>
        </template>

      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: []
    }
  },
  methods: {
    async fetch () {
      const res = await this.$http.get('rest/categories')
      this.items = res.data
    },
    async remove (row) {

      this.$confirm(`此操作将永久删除分类"${row.name}", 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`rest/categories/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetch()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }

  },
  created () {
    this.fetch()
  }
}
</script>