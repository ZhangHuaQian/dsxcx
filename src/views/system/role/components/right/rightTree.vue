<template>
  <div>
    <el-row>
      <h4>功能权限</h4>
    </el-row>
    <div style="padding: 10px;border: 1px solid #eaeaea;">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="[5]"
        :props="defaultProps"
      />
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/request'
export default {
  props: {
    checkedItem: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    getMenu(data) {
      getList('/sys/upms/menu', data, '/getMenuByUser').then(response => {
        const results = response.data
        this.list = results.data
        this.listLoading = false
      })
    },
    refresh() {
      this.$refs.leftTable.getList()
    }
  }
}
</script>

<style>
</style>
