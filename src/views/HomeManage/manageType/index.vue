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
    <el-dialog title="添加商品类型" :visible.sync="dialogFormVisibleAdd">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="商品类型名" :label-width="formLabelWidth" prop="typeName">
          <el-input v-model="form.typeName" autocomplete="off" clearable placeholder="请输入商品类型名"></el-input>
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth">
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
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item label="编辑商品ID名" :label-width="formLabelWidth" >
          <el-input v-model="form.id" autocomplete="off" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="编辑商品类型名" :label-width="formLabelWidth" prop="typeName">
          <el-input v-model="form.typeName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="编辑商品简介" :label-width="formLabelWidth">
          <el-input v-model="form.synopsis" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="handleEdits">提交</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看商品类型" :visible.sync="dialogFormVisibleSee">
      <el-form :model="form">
        <el-form-item label="查看商品ID名" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" clearable :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="查看商品类型名" :label-width="formLabelWidth">
          <el-input v-model="form.typeName" autocomplete="off" clearable :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="查看商品简介" :label-width="formLabelWidth">
          <el-input v-model="form.synopsis" autocomplete="off" clearable :disabled="true"></el-input>
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
        <template v-slot="scope" is-center>{{ scope.$index+1+(currentPage-1)*10 }}</template>
      </el-table-column>

      <el-table-column label="类型" width="150" align="center">
        <template v-slot="scope">{{ scope.row.typeName }}</template>
      </el-table-column>
      <el-table-column label="简介" width="360" align="center">
        <template v-slot="scope">{{ scope.row.synopsis }}</template>
      </el-table-column>

      <el-table-column label="创建人" width="120" align="center">
        <template v-slot="scope">{{ scope.row.createUser }}</template>
      </el-table-column>
      <el-table-column label="创建时间" width="180" align="center">
        <template v-slot="scope">{{ scope.row.modifyTime | modifyTime }}</template>
      </el-table-column>
      <!-- <el-table-column label="创建时间" width="300" align="center">
        <template v-slot="scope">{{ scope.row.modifyTime | modifyTime }}</template>
      </el-table-column>
      <el-table-column label="创建时间" width="300" align="center">
        <template v-slot="scope">{{ scope.row.modifyTime | modifyTime }}</template>
      </el-table-column> -->
      <el-table-column align="center" label="操作" width="220">
        <template v-slot="scope">
          <el-button size="small" type="primary" @click="handleSee(scope.row.id)">查看</el-button>
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="red"
            @onConfirm="handleDelete(scope.row.id)"
            title="确定删除吗？"
          >
            <el-button
              slot="reference"
              size="mini"
              type="danger"
             
            >删除</el-button>
          </el-popconfirm>
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button> -->
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
  getTypeList,
  TypeAdd,
  TypeDelete,
  TypeEdit,
  TypeSee,
  SearchTtype
} from "@/api/homeManage";
import insertComponent from "./insert.vue";
import updateComponent from "./update.vue";
import deleteComponent from "./delete.vue";
import selectComponent from "./select";
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
      rules: {
        typeName: [{ required: true, message: "请填写商品类型名", trigger: "blur" }],
        
      },
      listLoading: true,
      list: null,
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 10, // 每页的数据条数
      formInline: {},
      activeName: "0",
      options: [],
      input3: "",
      isIndex: 1,
      dialogFormVisibleAdd: false,
      dialogFormVisibleSee: false,
      dialogFormVisibleEdit: false,
      textarea2: "",
      form: {
        typeName: "",
        id: "",
        createTime: "",
        modifyTime: "",
        createUser: "",
        synopsis: ""
      },
      formLabelWidth: "120px"
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    
    getList() {
      const data = {
        openPage: this.openPage,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        form: this.form,
        isIndex:this.isIndex
      };
      this.listLoading = true;
      getTypeList(data).then(response => {
        const result = response.data;
        console.log(result, "homem");
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
      console.log(this.form.typeName);

      this.$refs.form.validate(valid => {
        if (valid) {
           TypeAdd(this.form.typeName, this.isIndex, this.form.synopsis).then(
        response => {
          const result = response.data;
          console.log(this.form.synopsis, "homem");
          if (result) {
            const data = result.data;
            this.list = result.data;
            this.currentPage = result.pageNum;
            this.total = result.count;
          }
        }
      );
      this.getList();
      this.dialogFormVisibleAdd = false;
      
      this.formView()
         
        } else {
          this.$message("有内容没有填写！");
        }
      });

     

      // console.log(index, row);
    },

    handleDelete(id) {
      TypeDelete(id).then(response => {
        const result = response.data;
        // console.log(result, "homem");
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }
      });
      this.getList();
    },
    handleEdit(data) {
      (this.dialogFormVisibleEdit = true), (this.form = data);
      
    },
    handleEdits() {

        this.$refs.form.validate(valid => {
        if (valid) {

          TypeEdit(this.form, this.isIndex).then(response => {
        const result = response.data;
        // console.log(result, "homem");
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }
      });
      this.getList();
      this.dialogFormVisibleEdit = false;
      this.formView()
          

          
         
        } else {
          this.$message("有内容没有填写！");
        }
      });



      

    },
    handleSee(id) {
      this.dialogFormVisibleSee = true;
      TypeSee(id).then(response => {
        const result = response.data;
        console.log(result);
        if (result) {
          // const data = result.data;
          // this.list = result.data;
          // this.currentPage = result.pageNum;
          // this.total = result.count;
          this.form = result.data;
        }
      });
      this.formView()
      console.log(this.form,'789')
    },
    Search() {
      SearchType(this.input3, this.isIndex).then(response => {
        const result = response.data;
        // console.log(result, "homem");
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }
        this.getList()
      });
    },
    formView(){
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = "";
        }
      }
    },
    Seeclose() {
      this.dialogFormVisibleSee = false;
      // this.form=''
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = "";
        }
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    handleSizeChange(val) {
      console.log("789");
      this.currentPage += 1;
      // this.fetchData();
      this.getList()
    },
    
  }
};
</script>

<style scoped>
</style>
