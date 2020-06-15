<template>
  <div class="app-container">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="商品名" prop="productName">
        <el-input v-model="ruleForm.productName"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="ruleForm.price"></el-input>
      </el-form-item>
      <el-form-item label="库存" prop="stock">
        <el-input v-model="ruleForm.stock"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        
        <el-radio-group v-model="ruleForm.status">
          <el-radio label="0" >上架</el-radio>
          <el-radio label="1">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品详情" prop="content">
        <el-input v-model="ruleForm.content"></el-input>
      </el-form-item>

      <el-form
        :model="ruleForm.productTypeList"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品分类" prop="id">
          <el-select v-model="ruleForm.productTypeList.id" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form
        :model="ruleForm.productDiscountList"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品折扣" prop="discount">
          <el-input placeholder="请输入折扣" v-model="ruleForm.productDiscountList.discount">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="折扣时间" prop="date">
          <el-date-picker
            v-model="ruleForm.productDiscountList.startTime"
            type="datetime"
            placeholder="选择开始日期时间"
          ></el-date-picker>
          <el-date-picker
            v-model="ruleForm.productDiscountList.endTime"
            type="datetime"
            placeholder="选择结束日期时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <el-form
        :model="ruleForm.productImageList"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="图片名" prop="imageName">
          <el-input placeholder="图片名" v-model="ruleForm.productImageList.imageName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item>
          <ImgUpload
            :geturl="ruleForm.productImageList.imageUrl"
            @onAvatarSuccess="handleAvatarSuccess"
          />
        </el-form-item>
        <el-form-item label="是否封面" prop="isFace">
        
        <el-radio-group v-model="ruleForm.productImageList.isFace">
          <el-radio label="0" >否</el-radio>
          <el-radio label="1">是</el-radio>
        </el-radio-group>
      </el-form-item>
      </el-form>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getTypeList,
  TypeAdd,
  TypeDelete,
  TypeEdit,
  TypeSee,
  SearchTtype,
  productInsert
} from "@/api/CommodityManage";
import ImgUpload from "@/components/upload/image";

export default {
  components: {
    ImgUpload
  },
  filters: {},
  data() {
    return {
      ruleForm: {
        productName: "",
        price:'',
        stock:'',
        status: "",
        content: "",

        productTypeList: {
          // value: "",
          id:''
        },
        productDiscountList: {
          // input: "",
          startTime: "",
          endTime: "",
          discount:'',
        },
        productImageList: {
          imageName: "",
          // value: "",
          imageUrl: "",
          isFace:''
        }
      },

      options: "",
      value1: [],

      rules: {
        productName: [
          {
            required: true,
            type: "string",
            message: "请输入商品名",
            trigger: "blur"
          },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        // img: [
        //   { required: true, message: "请输入图片名", trigger: "blur" },
        //   { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        // ],
        content: [
          { required: true, message: "请输入商品详情", trigger: "blur" },
          { min: 1, max: 10,  message: "长度在 1 到 10 个字符", trigger: "blur" },
          
        ],
        price: [
          { required: true, message: "请输入价格", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" },
          // {type:"number",message:'价格必须为数字类型',trigger:"blur"}
        ],
        stock: [
          { required: true, message: "请输入库存", trigger: "blur" },
          // { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" },
          // { type: "number", message: "库存必须为数字值", trigger: "blur" }
        ],
        imageName: [
          { required: true, message: "请输入图片名", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        discount: [
          // { required: true, message: "请输入折扣", trigger: "blur" },
          // { type: "number", message: "年龄必须为数字值", trigger: "blur" }
        ],
        id: [
            { required: true, message: '请选择商品分类', trigger: 'change' }
          ],
        date: [
          {
            type: "date",
            // required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        status: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        isFace: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      getTypeList(this.currentPage, this.pageSize).then(response => {
        const result = response.data;
        console.log(result);
        if (result) {
          const data = result.data;
          // for(let i = 0; i < data.length; i++) {
          //   this.options+=[{
          //     value:i,
          //     label:result.data[i].typeName
          //   }]
          //   // this.options[i].label = result.data[i].typeName;
          //   console.log(result.data[i].typeName);
          // }
          // this.options.label=result.date.typeName
          this.options=result.data
          console.log(this.options)

          this.currentPage = result.pageNum;
          this.total = result.count;
        }
        this.listLoading = false;
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          console.log(this.ruleForm);
        } else {
          console.log("error submit!!");
          return false;
        }

        productInsert(this.ruleForm).then(response => {
        const result = response.data;
        console.log(result,'执行了');
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }
        this.listLoading = false;
      });

      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.productImageList.imageUrl = "";
    },
    handleAvatarSuccess(imageUrl, res, file) {
      console.log('执行了',imageUrl, res, file, "789");
      this.ruleForm.productImageList.imageUrl = imageUrl;
      this.ruleForm.productImageList.imageName=file.name
      this.fileName = file.name;
      // this.option.img = imageUrl;
      this.$nextTick(() => {
        // this.option.img = imageUrl;
        this.cropperDialogVisible = true;
      });
    }

    // getList() {
    //   this.listLoading = true;
    //   getTypeList(this.isIndex).then(response => {
    //     const result = response.data;
    //     console.log(result, "homem");
    //     if (result) {
    //       const data = result.data;
    //       this.list = result.data;
    //       this.currentPage = result.pageNum;
    //       this.total = result.count;
    //     }
    //     this.listLoading = false;
    //   });
    // },
  }
};
</script>

<style scoped>
</style>
