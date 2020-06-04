<template>
  <div>
    <el-row style="border-bottom: 1px solid #eaeaea;">
      <el-col :span="17"><h4>角色列表</h4></el-col>
      <el-col :span="7" style="line-height: 60px;text-align: center;">
        <el-row>
          <el-col :span="8"><insertComponent @refresh="getList" /></el-col>
          <el-col :span="8"><updateComponent v-if="checkedItem" :itemid="checkedItem.id" @refresh="getList" /></el-col>
          <el-col :span="8"><deleteComponent v-if="checkedItem" :itemid="checkedItem.id" @refresh="getList" /></el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-table
      ref="table"
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      stripe
      fit
      :highlight-current-row="true"
      @row-click="checkedTableRow"
    >
      <el-table-column align="center" label="序号" width="65">
        <template v-slot="scope">
          {{ scope.$index+1+(currentPage-1)*10 }}
        </template>
      </el-table-column>
      <el-table-column label="角色名称">
        <template v-slot="scope">
          {{ scope.row.roleName }}
        </template>
      </el-table-column>
      <el-table-column label="角色编码">
        <template v-slot="scope">
          {{ scope.row.roleCode }}
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        background
        layout="total, prev, pager, next, jumper"
        :page-size="pageSize"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/request'
import insertComponent from './insert.vue'
import updateComponent from './update.vue'
import deleteComponent from './delete.vue'
// import moment from 'moment'
// moment.locale('zh-cn')
export default {
  components: {
    insertComponent,
    updateComponent,
    deleteComponent
  },
  props: {
    formInline: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      listLoading: true,
      list: [],
      checkedItem: {},
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 10 // 每页的数据条数
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      const data = {
        ...this.formInline,
        page: this.currentPage
      }
      getList('/sys/upms/role', data).then(response => {
        const results = response.data
        this.currentPage = results.pageNum
        this.total = results.count
        this.list = results.data
        this.checkedItem = this.list[0]
        this.listLoading = false
        this.$refs.table.setCurrentRow(this.checkedItem, true)
      })
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    checkedTableRow(row, column, event) {
      this.checkedItem = row
      this.$emit('getCheckedItem', row)
    }
  }
}
</script>

<style scoped>
  .el-table /deep/ .el-table__body tr.current-row>td {
    border-top: 2px solid #d4e8ff;
  }
</style>
