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

    <el-dialog title="编辑商品类型" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="编辑商品ID名" :label-width="formLabelWidth" >
          <el-input v-model="form.id" autocomplete="off" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="编辑商品类型名" :label-width="formLabelWidth">
          <el-input v-model="form.typeName" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="handleEdits">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看商品类型" :visible.sync="dialogFormVisibleSee">
      <el-form :model="form">
        <el-form-item label="查看商品ID名" :label-width="formLabelWidth" >
          <el-input v-model="form.id" autocomplete="off" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="查看商品类型名" :label-width="formLabelWidth">
          <el-input v-model="form.typeName" autocomplete="off" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" :label-width="formLabelWidth">
          <el-input v-model="form.createTime" autocomplete="off" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="修改时间" :label-width="formLabelWidth">
          <el-input v-model="form.modifyTime" autocomplete="off" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="创建人" :label-width="formLabelWidth">
          <el-input v-model="form.createUser" autocomplete="off" clearable :disabled="true"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Seeclose">确定</el-button>
      </div>
    </el-dialog>
    <el-table v-loading="listLoading" :data="list" style="width: 100%" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="编号" width="70" align="center">
        <template v-slot="scope">
          {{ scope.$index+1+(currentPage-1)*10 }}
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center" width="360">
        <template v-slot="scope">
          {{ scope.row.productName }}
        </template>
      </el-table-column>
      <el-table-column label="发布人" align="center" width="180">
        <template v-slot="scope">
          {{ scope.row.createUser }}
        </template>
      </el-table-column>
      <el-table-column label="商品原价" align="center" width="180">
        <template v-slot="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="库存" align="center" width="180">
        <template v-slot="scope">
          {{ scope.row.stock }}
        </template>
      </el-table-column>
      <el-table-column label="销量" align="center" width="180">
        <template v-slot="scope">
          {{ scope.row.sales }}
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center" width="360">
          <template v-slot="scope">
            {{ scope.row.createTime | modifyTime }}
          </template>
      </el-table-column>
     
     <el-table-column label="类型" align="center" width="180">
        <template v-slot="scope">
          {{ scope.row.typeName }}
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="操作" width="220">
        <template v-slot="scope">
          <el-button size="small"  type="primary" @click="handleSee(scope.row.id)">查看</el-button>
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
  import {
    getInfoList,InfoDelete,InfoEdit,InfoSee,Searchinfo
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
            createTime:'',
            createUser:'',
            id:'',
            typeName:''
        },
        dialogFormVisibleEdit:false,
        dialogFormVisibleAdd:false,
        dialogFormVisibleSee:false,
        
      }
    },
    mounted() {
      this.getList()
    },
    methods: {
      getList(){
        this.listLoading = true
        const data = {
        openPage: this.openPage,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        form: this.form
      };
        getInfoList(data).then(response => {
          const result = response.data
          console.log(result,'888')
          if (result) {
            const data = result.data
            this.list = result.data
            this.currentPage = result.pageNum
            this.total = result.count
          }
          this.listLoading = false
        })
      },
      handleDelete(id) {
      InfoDelete(id).then(response => {
        const result = response.data;
        // console.log(result, "homem");
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }

        
      });
      this.getList()
      
    },
    handleEdit(data) {
      this.dialogFormVisibleEdit=true,
      this.form=data
      
    },
    handleEdits() {
      InfoEdit(this.form,this.isIndex).then(response => {
        const result = response.data;
        // console.log(result, "homem");
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }

        
      });
      this.getList()
      this.dialogFormVisibleEdit=false
      this.formView()
      
    },
    handleSee(id) {
      this.dialogFormVisibleSee = true;
      InfoSee(id).then(response => {
        const result = response.data;
        console.log(result,'12580');
        if (result) {
          // const data = result.data;
          // this.list = result.data;
          // this.currentPage = result.pageNum;
          // this.total = result.count;
          this.form = result.data;
        }
      });
      this.formView()
      
    },
    Search(){

      SearchInfo(this.input3,this.isIndex).then(response => {
        const result = response.data;
        // console.log(result, "homem");
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }

        
      });

    },
    formView(){
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = "";
        }
      }
    },
    Seeclose(){
      this.dialogFormVisibleSee = false
      // this.form=''
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = "";
        }
      }
    },
    handleAdd(){
      this.dialogFormVisibleAdd=false
    },
      handleClick(index,row) {
        console.log(index, row);
      },
     handleSizeChange(val) {
      console.log("789");
      this.currentPage += 1;
      
      this.getList()
    },
    handleCurrentChange(val) {
      console.log("456");
      this.currentPage = val;

      
      this.getList()
    },
    }
  }
</script>

<style scoped>

</style>
