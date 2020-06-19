<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="3">
        <el-button style="margin-top: 15px;" type="info">省份名称:</el-button>
      </el-col>
      <el-col :span="8">
        <div style="margin-top: 15px;margin-bottom: 50px;width:20vw">
          <el-input
            placeholder="请输入省份"
            v-model="input3"
            @input="Search"
            class="input-with-select"
            clearable
          >
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
      <el-form :model="form" >
        <el-form-item label="省份" :label-width="formLabelWidth" >
          <!-- <el-input v-model="form.province" autocomplete="off" clearable ></el-input> -->
          <el-select v-model="form.province" placeholder="请选择省份">
            <el-option
              v-for="item in optionPostage"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
          <el-input v-model="form.postage" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()" disabled>提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="编辑商品类型" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="编辑省份" :label-width="formLabelWidth"  prop="province">
          <el-input v-model="form.province" autocomplete="off" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="是否包邮" :label-width="formLabelWidth">
          <el-select v-model="form.isFree" clearable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编辑价格" v-if="free()" :label-width="formLabelWidth">
          <el-input v-model="form.postage" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="handleEdits">提交</el-button>
      </div>
    </el-dialog>
    <!-- 包邮 -->
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
        <template  v-slot="scope">{{ scope.$index+1+(currentPage-1)*10 }}</template>
      </el-table-column>
      <el-table-column label="地区" width="360" align="center">
        <template  v-slot="scope">{{ scope.row.province }}</template>
      </el-table-column>
      <el-table-column label="邮费" width="360" align="center">
        <template  v-slot="scope">{{ scope.row.postage }}</template>
      </el-table-column>

      <el-table-column label="是否包邮" width="180" align="center">
        <template v-slot="scope"><p v-if="scope.row.isFree==1">是</p><p v-if="scope.row.isFree==0">否</p>  </template>
        <!-- {{ scope.row.isFree }} -->
      </el-table-column>

      <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="red"
            @onConfirm="handleDelete(scope.$index, scope.row)"
            title="确定删除吗？"
          >
            <el-button slot="reference" size="mini" type="danger">删除</el-button>
          </el-popconfirm>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 不包邮 -->
    
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
  getInfoList,
  postageAdd,
  SearchInfo,
  postageEdit,
  postageSearch
} from "@/api/postage";

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
      openPage: false,
      form: {
        province: "",
        isFree: "1",
        postage: ""
        // value:""
      },
      dialogFormVisibleEdit: false,
      dialogFormVisibleAdd: false,

      formLabelWidth: "120px",
      optionPostage:[
        { value: "北京市", label: "北京市" },
        { value: "天津市", label: "天津市" },
        { value: "上海市", label: "上海市" },
        { value: "重庆市", label: "重庆市" },
        { value: "河北省", label: "河北省" },
        { value: "山西省", label: "山西省" },
        { value: "内蒙古自治区", label: "内蒙古自治区" },
        { value: "辽宁省", label: "辽宁省" },
        { value: "吉林省", label: "吉林省" },
        { value: "黑龙江省", label: "黑龙江省" },
        
        { value: "江苏省", label: "江苏省" },
        { value: "浙江省", label: "浙江省" },
        { value: "安徽省", label: "安徽省" },
        { value: "福建省", label: "福建省" },
        { value: "江西省", label: "江西省" },
        { value: "山东省", label: "山东省" },
        { value: "河南省", label: "河南省" },
        { value: "湖北省", label: "湖北省" },
        { value: "湖南省", label: "湖南省" },
        { value: "广东省", label: "广东省" },
        { value: "广西壮族自治区", label: "广西壮族自治区" },
        { value: "海南省", label: "海南省" },
        
        { value: "四川省", label: "四川省" },
        { value: "贵州省", label: "贵州省" },
        { value: "云南省", label: "云南省" },
        { value: "西藏自治区", label: "西藏自治区" },
        { value: "陕西省", label: "陕西省" },
        { value: "甘肃省", label: "甘肃省" },
        { value: "青海省", label: "青海省" },
        { value: "宁夏回族自治区", label: "宁夏回族自治区" },
        { value: "新疆维吾尔自治区", label: "新疆维吾尔自治区" },
        { value: "台湾省", label: "台湾省" },
        { value: "香港特别行政区", label: "香港特别行政区" },
        { value: "澳门特别行政区", label: "澳门特别行政区" }
        
      ],
      options: [
        {
          value: "1",
          label: "是"
        },
        {
          value: "0",
          label: "否"
        }
      ],
      rules: {
        // province: [
        //   { required: true, message: "请省省份或地区名", trigger: "blur" },
        //   { min: 0, max: 10, message: "长度在 0 到 10 个字符", trigger: "blur" }
        // ]
        //  postage: [
        //   { required: true, message: '请输入价格', trigger: 'blur' },
        //   {  type: 'number', message: '价格为数字类型', trigger: 'blur' }
        // ]
      }
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
      const data = {
        openPage: this.openPage,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        form: this.form
      };
      getInfoList(data).then(response => {
        const result = response.data;
        console.log(result);
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
          console.log(this.list,'list')
        }
        this.listLoading = false;
      });
    },
    handleAdd() {
      
          console.log(this.form, "添加操作");
          this.listLoading = true;

          if (this.form.isFree == 1) {
            this.form.postage = "0";
          }
          console.log(this.form, "45678977");
          postageAdd(this.form).then(response => {
            const result = response.data;
            console.log(result);
            if (result) {
              const data = result.data;
              this.list = result.data;
              this.currentPage = result.pageNum;
              this.total = result.count;
            }
            (this.form.postage = ""), (this.form.province = "");
            this.dialogFormVisibleAdd = false;
            this.getList();
            this.listLoading = false;
          });
       
     
    },
    handleEdits() {
      this.listLoading = true;
      // if(this.form.isFree==0){
      //   this.form.postage=='0'
      // }
      console.log(this.form, "bianji");
      postageEdit(this.form).then(response => {
        const result = response.data;
        console.log(result, "编辑运费");
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }
        (this.form.postage = ""), (this.form.province = "");
        this.dialogFormVisibleEdit = false;
        this.getList();
        this.listLoading = false;
      });
    },

    handleEdit(data) {
      this.dialogFormVisibleEdit = true;
      console.log(data, "bianjiya");
      this.form.province = data.province;
      this.form.postage = data.postage;
      this.form.id = data.id;
      console.log(data.isFree);
      // if(data.isFree==0){
      //   console.log('vhufa')
      //   this.form.isFree=='否'
      // }else{
      //   this.form.isFree=='是'
      // }
      // this.form=data
    },
    handleDelete(index, row) {

      

      
    },
    handleClick(index, row) {
      console.log(index, row);
    },
    Search() {
      console.log(this.input3);
      this.listLoading = true
      SearchInfo(this.openPage, this.input3).then(response => {
        const result = response.data;
        console.log(result);
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }
        this.listLoading = flase
      });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    change() {
      console.log("执行了", this.form.isFree);
      // this.free()
    },
    Search() {
      console.log("触发了", this.input3);
      this.form.province = this.input3;
      const data = {
        province: this.input3,
        openPage: false
      };
      console.log(data, "rt 执行了");
      postageSearch(data).then(response => {
        const result = response.data;
        console.log(result);
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
          this.form.bannerName = "";
          this.url = result.imageUrl;
        }
      });
    },
    free() {
      if (this.form.isFree == 0) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style scoped>
</style>
