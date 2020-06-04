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
    <el-dialog title="添加运费" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="省份" :label-width="formLabelWidth">
          <el-input v-model="form.province" autocomplete="off" clearable ></el-input>
        </el-form-item>
        <el-form-item label="是否包邮" :label-width="formLabelWidth">
          <el-select v-model="form.isFree" @change="change" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格" v-if="free()" :label-width="formLabelWidth">
          <el-input v-model="form.postage"  autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑商品类型" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="编辑省份" :label-width="formLabelWidth">
          <el-input v-model="form.province" autocomplete="off" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="是否包邮" :label-width="formLabelWidth">
          <el-select v-model="form.isFree"  clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编辑价格"  :label-width="formLabelWidth">
          <el-input v-model="form.postage"  autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="handleEdits">提交</el-button>
      </div>
    </el-dialog>
    <el-table
      v-loading="listLoading"
      :data="list"
      style="width: 100%"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="编号" width="70" align="center">
        <template v-slot="scope">{{ scope.$index+1+(currentPage-1)*10 }}</template>
      </el-table-column>
      <el-table-column label="地区" width="360" align="center">
        <template v-slot="scope">{{ scope.row.province }}</template>
      </el-table-column>
      <el-table-column label="邮费" width="360" align="center">
        <template v-slot="scope">{{ scope.row.postage }}</template>
      </el-table-column>

      <el-table-column label="是否包邮" width="180" align="center">
        <template v-slot="scope">{{ scope.row.isFree}}</template>
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
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
import { getInfoList,postageAdd,SearchInfo } from "@/api/postage";

import moment from "moment";
moment.locale("zh-cn");

export default {
  components: {},
  filters: {
    statusFilter: value => {
      const statusMap = {
        "1": "待审核",
        "2": "已通过",
        "3": "已发布",
        "4": "已退稿",
        "5": "草稿"
      };
      return statusMap[value];
    },
    modifyTime(time) {
      return moment(time).format(" YYYY MMM Do, dddd, HH:mm:ss");
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
      activeName: "0",
      options: [],
      input3: "",
      openPage:true,
      form: {
        province: "",
        isFree: "",
        postage: "",
        // value:""
      },
      dialogFormVisibleEdit: false,
      dialogFormVisibleAdd: false,
      

      formLabelWidth: "120px",
      options: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "不是"
        }
      ],
      
    };
  },
  mounted() {
    this.getList();
  },
  // updated(){
  //   this.free()
  // },
  methods: {
    getList() {
      this.listLoading = true;
      getInfoList(this.currentPage, this.pageSize).then(response => {
        const result = response.data;
        console.log(result);
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }
        this.listLoading = false;
      });
    },
    handleAdd() {
      this.listLoading = true;
     
      if(this.form.isFree==1){
        this.form.postage='0'
      }
       console.log(this.form,'45678977')
      postageAdd(this.form).then(response => {
        const result = response.data;
        console.log(result);
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }
        this.listLoading = false;
      });
    },
    handleEdits() {
      // this.listLoading = true;
      console.log(this.form)
      // getInfoList(this.currentPage, this.pageSize).then(response => {
      //   const result = response.data;
      //   console.log(result);
      //   if (result) {
      //     const data = result.data;
      //     this.list = result.data;
      //     this.currentPage = result.pageNum;
      //     this.total = result.count;
      //   }
      //   this.listLoading = false;
      // });
    },

    handleEdit(data) {
      this.dialogFormVisibleEdit = true;
      console.log(data)
      this.form.province=data.province
      this.form.postage=data.postage
      console.log(data.isFree)
      // if(data.isFree==0){
      //   console.log('vhufa')
      //   this.form.isFree=='否'
      // }else{
      //   this.form.isFree=='是'
      // }
      // this.form=data
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleClick(index, row) {
      console.log(index, row);
    },
    Search(){
      console.log(this.input3)
      SearchInfo(this.openPage,this.input3).then(response => {
        const result = response.data;
        console.log(result);
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }})
        
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    change(){
      console.log('执行了',this.form.isFree);
      // this.free()
      
    },
    free(){
      if(this.form.isFree==0){
        return true
      }else{
        return false
      }
    }
  }
};
</script>

<style scoped>
</style>
