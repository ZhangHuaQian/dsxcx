<template>
  <el-popover v-model="visible" placement="top" width="160">
    <p>确定删除吗？</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible=false">取消</el-button>
      <el-button type="primary" size="mini" @click.native="handleDelete(itemid)">确定</el-button>
    </div>
    <el-button slot="reference" type="danger" size="small" icon="el-icon-delete" />
  </el-popover>
</template>
<script>
import { Delete } from '@/api/request'
export default {
  props: {
    itemid: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    handleDelete(id) {
      this.visible = false
      Delete('/sys/upms/role', id).then(response => {
        const data = response.data
        if (data.status === '1') {
          this.$emit('refresh')
          this.visible = false
          this.$message.success(data.msg)
        } else {
          this.$message.error(data.msg)
        }
      })
    }
  }
}
</script>

<style>
</style>
