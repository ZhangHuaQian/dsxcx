<template>
  <div class="app-container">


    <el-row :gutter="20">
      <el-col :span="8">
        <div style="margin-top: 15px;margin-bottom: 50px;width:20vw">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search" @click="Search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button
          type="primary"
          @click="dialogFormVisibleAdd = true"
          style="margin-bottom:10px;margin-top:15px"
        >添加</el-button>
      </el-col>
    </el-row>
    <el-dialog title="添加公告" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.typeName" autocomplete="off" clearable placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="form.typeName" autocomplete="off" clearable placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="" :label-width="formLabelWidth">
          <el-input v-model="form.typeName" autocomplete="off" clearable placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="form.synopsis"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">提交</el-button>
      </div>
    </el-dialog>
    <el-table v-loading="listLoading" :data="list" style="width: 100%" element-loading-text="Loading" border fit highlight-current-row align="center">
      <el-table-column label="编号" width="70" align="center">
        <template v-slot="scope">
          {{ scope.$index+1+(currentPage-1)*10 }}
        </template>
      </el-table-column>
      <el-table-column label="标题" width="360" align="center">
        <template v-slot="scope">
          {{ scope.row.productName }}
        </template>
      </el-table-column>
      <el-table-column label="发布人" width="220" align="center">
        <template v-slot="scope">
          {{ scope.row.productName }}
        </template>
      </el-table-column>
      
      <el-table-column label="创建时间" width="360" align="center">
          <template v-slot="scope">
            {{ scope.row.modifyTime | modifyTime }}
          </template>
      </el-table-column>

      <el-table-column label="" width="180" align="center">
        <template v-slot="scope">
          {{ scope.row.productName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <el-button size="small"  type="primary" @click="handleClick(scope.$index, scope.row)">查看</el-button>
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :page-size="pageSize"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
  import {
    getInfoList
  } from '@/api/homeManage'
  import insertComponent from './insert.vue'
  import updateComponent from './update.vue'
  import deleteComponent from './delete.vue'
  import selectComponent from './select'
  import moment from 'moment'
  moment.locale('zh-cn')
  export default {
    components: {

    },
    filters: {
      statusFilter: value => {
        const statusMap = {
          '1': '待审核',
          '2': '已通过',
          '3': '已发布',
          '4': '已退稿',
          '5': '草稿'
        }
        return statusMap[value]
      },
      modifyTime(time) {
        return moment(time).format(' YYYY MMM Do, dddd, HH:mm:ss')
      }
    },
    data() {
      return {
        listLoading: true,
        list: null,
        currentPage: 1, // 当前页码
        total: 0, // 总条数
        pageSize: 10, // 每页的数据条数
        formInline: {},
        activeName: '0',
        options: [],
        input3:'',
        formLabelWidth:'120px',
        form:{

        },
        dialogFormVisibleAdd:false
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList(){
        this.listLoading = true
        getInfoList(this.currentPage, this.pageSize).then(response => {
          const result = response.data
          console.log(result)
          if (result) {
            const data = result.data
            this.list = result.data
            this.currentPage = result.pageNum
            this.total = result.count
          }
          this.listLoading = false
        })
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleClick(index,row) {
        console.log(index, row);
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getList()
      },
      handleAdd(){

      },
      Search(){
        console.log(this.input3)
      }
    }
  }
</script>

<style scoped>

</style>
