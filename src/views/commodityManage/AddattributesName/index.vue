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
          <el-radio label="0">上架</el-radio>
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
          <!-- <el-select v-model="ruleForm.productTypeList.id" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            ></el-option>
          </el-select>-->

          <el-select v-model="ruleForm.productTypeList.id" placeholder="请选择">
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
          <el-input
            placeholder="图片名"
            v-model="ruleForm.productImageList.imageName"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="图片链接" prop="imageName">
          <el-input
            placeholder="图片链接"
            v-model="ruleForm.productImageList.imageUrl"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <ImgUpload
            :geturl="ruleForm.productImageList.imageUrl"
            @onAvatarSuccess="handleAvatarSuccess"
          />
        </el-form-item>
        <el-form-item label="是否封面" prop="isFace">
          <el-radio-group v-model="ruleForm.productImageList.isFace">
            <el-radio label="0">否</el-radio>
            <el-radio label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 添加商品属性 -->
    <el-dialog title="添加商品属性" :visible.sync="dialogFormVisibleAddABN">
      <el-button @click="addAttributes">新增商品属性名</el-button>
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="100px"
        class="demo-dynamic"
        v-for="(Attributes,indexS) in dynamicValidateForm.Attributes"
        :key="indexS"
        style="border:1px solid red;margin:10px;padding:5px"
      >
        <el-form-item>{{productId}}</el-form-item>
        <el-form-item
          prop="email"
          :label="'商品属性名'+indexS"
          :rules="[
      { required: true, message: '商品属性名', trigger: 'blur' },
      { type: 'string', message: '商品属性名', trigger: ['blur', 'change'] }
    ]"
        >
          <el-input v-model="dynamicValidateForm.Attributes[indexS].attributesName"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(domain, indexY) in dynamicValidateForm.Attributes[indexS].valueList"
          :label="'商品属性值' + index"
          :key="indexY"
          :prop="'valueList.' + index + '.value'"
          :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
        >
          <el-input v-model="domain.attributesValue"></el-input>
          <el-button @click.prevent="removeDomain(indexS,indexY)">删除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="addDomain(indexS)">新增商品属性值</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAddABN = false">取 消</el-button>
        <el-button type="primary" @click="AttributeADD">确 定</el-button>
      </div>
    </el-dialog>
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
import moment from "moment";
moment.locale("zh-cn");

export default {
  components: {
    ImgUpload
  },
  filters: {},
  data() {
    return {
      dynamicValidateForm: {
        Attributes: [
          {
            productId:this.productId,
            attributesName: "123",
            valueList: [
              {
                attributesValue: "456",
                
              }
            ]
          }
        ]
        
      },
      AttributeData:'',
      ruleForm: {
        productName: "",
        price: "",
        stock: "",
        status: "",
        content: "",

        productTypeList: {
          // value: "",
          id: ""
        },
        productDiscountList: {
          // input: "",
          startTime: "",
          endTime: "",
          discount: ""
        },
        productImageList: {
          imageName: "",
          // value: "",
          imageUrl: "",
          isFace: ""
        }
      },

      options: "",
      value1: [],
      productId: "",
      dialogFormVisibleAddABN: false,

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
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入价格", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
          // {type:"number",message:'价格必须为数字类型',trigger:"blur"}
        ],
        stock: [
          { required: true, message: "请输入库存", trigger: "blur" }
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
        id: [{ required: true, message: "请选择商品分类", trigger: "change" }],
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
    console.log(this.dynamicValidateForm, "98");
  },
  methods: {
    getList() {
      this.listLoading = true;
      getTypeList(this.currentPage, this.pageSize).then(response => {
        const result = response.data;
        console.log(result);
        if (result) {
          const data = result.data;
      
          this.options = result.data;
          console.log(this.options);

          this.currentPage = result.pageNum;
          this.total = result.count;
        }
        this.listLoading = false;
      });
    },

    submitForm(formName) {
      this.dialogFormVisibleAddABN = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          console.log(this.ruleForm, "提交的表单");
        } else {
          console.log("error submit!!");
          return false;
        }
        console.log(
          this.getMoment(
            this.ruleForm.productDiscountList.startTime,
            "YYYY-MM-DD HH-mm-ss"
          ),
          "time"
        );
        (this.ruleForm.productDiscountList.startTime = this.getMoment(
          this.ruleForm.productDiscountList.startTime,
          "YYYY-MM-DD HH:mm:ss"
        )),
          (this.ruleForm.productDiscountList.endTime = this.getMoment(
            this.ruleForm.productDiscountList.endTime,
            "YYYY-MM-DD HH:mm:ss"
          ));

        // 新增商品数据
        const data = {
          productName: this.ruleForm.productName, //商品名
          price: this.ruleForm.price, //价格 单位元，保留两位小数
          stock: this.ruleForm.stock, //库存
          status: this.ruleForm.status, //下架情况 0上架 1下架
          content: this.ruleForm.content, //商品详情
          productTypeList: [
            //商品分类列表
            {
              id: this.ruleForm.productTypeList.id //商品分类id
            }
          ],
          productDiscountList: [
            //商品折扣列表
            {
              discount: "" + this.ruleForm.productDiscountList.discount + "", //折扣 百分比形式
              startTime: "" + this.ruleForm.productDiscountList.startTime + "", //打折开始时间 精确到小时
              endTime: "" + this.ruleForm.productDiscountList.endTime + "" //daze结束时间 精确到小时
            }
          ],
          productImageList: [
            {
              //商品图片列表
              imageName: "" + this.ruleForm.productImageList.imageName + "", //图片名
              imagUrl: "" + this.ruleForm.productImageList.imagUrl + "", //图片地址
              isFace: "" + this.ruleForm.productImageList.isFace + "" //是否是封面 0否 1是
            }
          ]
        };
        productInsert(data).then(response => {
          const result = response.data;
          console.log(result, "执行了951");
          if (result) {
            const data = result.data;
            this.list = result.data;
            this.currentPage = result.pageNum;
            this.total = result.count;
            this.productId = result.productId;
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
      console.log("执行了o", imageUrl, res, file, "789");
      this.ruleForm.productImageList.imageUrl = imageUrl;
      this.ruleForm.productImageList.imageName = file.name;
      this.fileName = file.name;
      // this.option.img = imageUrl;
      this.$nextTick(() => {
       
        this.cropperDialogVisible = true;
      });
    },
    getMoment(date, str) {
      return moment(date).format(str);
    },
    removeDomain(item, item1) {
      console.log(this.dynamicValidateForm.Attributes[item].valueList, "id");
     
      this.dynamicValidateForm.Attributes[item].valueList.splice(item1, 1);
      
    },
    addAttributes() {
      this.dynamicValidateForm.Attributes.push({
        productId:this.productId,
        attributesName: "",
        valueList: [
          {
            attributesValue: "",
           
          }
        ]
      });
    },
    addDomain(indexS) {
      console.log(indexS, this.dynamicValidateForm.Attributes[indexS]);
      this.dynamicValidateForm.Attributes[indexS].valueList.push({
        attributesValue: "",
        // id: ""
      });
    },
    AttributeADD() {
      // dialogFormVisibleAddABN = false
      console.log(this.dynamicValidateForm, "提交的");
      
      const data = [
        {
         
        }
      ];

      AttributeInsert(data).then(response => {
        const result = response.data;
        // console.log(result, "执行了");
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }
        this.listLoading = false;
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
