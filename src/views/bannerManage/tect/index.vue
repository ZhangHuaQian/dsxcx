<template>
  <div class="app-container">
    <div style="margin-top: 15px;margin-bottom: 50px;width:20vw">
      <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" clearable>
        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
      </el-input>
    </div>
    <el-button type="primary" @click="dialogFormVisibleTJ = true" style="margin-bottom:10px">添加</el-button>
    <el-dialog title="添加轮播图之上传图片" :visible.sync="dialogFormVisibleTJ">
      <!-- <el-upload
        class="upload-demo"
        action="http://192.168.1.12:8188/shop/base/uploadImg"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :on-success="handleSuccess"
        ref="upload"
        :limit="1"
        accept
        :on-exceed="handleExceed"
        list-type="picture-card"
        :auto-upload="false"
      >
        <i class="el-icon-plus"></i>
        <img v-if="imageUrl" :src="imageUrl" style="width:80px;height:60px;border:1px solid #666" />
      </el-upload>-->

      <ImgUpload :geturl="form.imageUrl" @onAvatarSuccess="handleAvatarSuccess" />

      <!-- 图片裁剪 -->

      <el-dialog
        title="图片剪裁"
        :visible.sync="cropperDialogVisible"
        append-to-body
        :close-on-click-modal="false"
        @close="closeUpload"
      >
        <div class="cropper-content">
          <div class="cropper" style="text-align:center">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :output-size="option.size"
              :output-type="option.outputType"
              :info="option.info"
              :full="option.full"
              :fixed="option.fixed"
              :fixed-number="option.fixedNumber"
              :can-move="option.canMove"
              :can-move-box="option.canMoveBox"
              :fixed-box="option.fixedBox"
              :original="option.original"
              :auto-crop="option.autoCrop"
              :auto-crop-width="option.autoCropWidth"
              :auto-crop-height="option.autoCropHeight"
              :center-box="option.centerBox"
              :high="option.high"
            />
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="finish">确认</el-button>
          <el-button @click="closeUpload">取 消</el-button>
        </div>
      </el-dialog>

      <!-- 图片裁剪结束 -->

      <!-- <el-dialog :visible.sync="dialogVisible" append-to-body>
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>-->

      <el-dialog :visible.sync="dialogVisibleTJ" append-to-body>
        <!-- <el-form :model="form"> -->
        <!-- <el-form-item label="轮播图名称" :label-width="formLabelWidth">
            <el-input v-model="form.bannerName" autocomplete="off" clearable></el-input>
          </el-form-item>
          <el-form-item label="轮播图图片" :label-width="formLabelWidth">
            <el-image style="width: 100px; height: 100px" :src="form.imageUrl" fill></el-image>
          </el-form-item>
          <el-form-item label="轮播图地址" :label-width="formLabelWidth">
            <el-input v-model="form.imageUrl" autocomplete="off" clearable disabled></el-input>
        </el-form-item>-->

        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="标题" prop="bannerName">
            <el-input v-model="form.bannerName" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="form.synopsis" placeholder="请输入简介" />
          </el-form-item>
          <el-form-item label="图片详情">
            <el-image style="width: 100px; height: 100px" :src="form.imageUrl" fill></el-image>
          </el-form-item>
           <el-form-item label="轮播图地址" :label-width="formLabelWidth">
            <el-input v-model="form.imageUrl" autocomplete="off" clearable disabled></el-input>
        </el-form-item>
          <el-form-item label="链接">
            <el-input v-model="form.url" placeholder="请输入链接">
              <template slot="prepend">Http://</template>
            </el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleTJ = false">取 消</el-button>
          <el-button type="primary" @click="bannerAdd()">提交</el-button>
        </div>
      </el-dialog>

      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">提交</el-button>
        
      </div> -->

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
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
      <el-table-column label="名称" width="180">
        <template v-slot="scope">{{ scope.row.bannerName }}</template>
      </el-table-column>
      <el-table-column label="发布人" width="180">
        <template v-slot="scope">{{ scope.row.createUser }}</template>
      </el-table-column>

      <el-table-column label="创建时间" width="180">
        <template v-slot="scope">{{ scope.row.createTime | modifyTime }}</template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template v-slot="scope">
          <!-- <el-button size="mini" type="primary" @click="handleClick(scope.$index, scope.row)">查看</el-button> -->
          <el-button type="primary" size="mini" @click="bannerSee(scope.row.id)">查看</el-button>
          <el-dialog title="查看轮播图" :visible.sync="dialogFormVisibleSee">
            <el-form :model="form">
              <el-form-item label="轮播图ID" :label-width="formLabelWidth">
                <el-input v-model="form.id" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="轮播图名称" :label-width="formLabelWidth">
                <el-input v-model="form.bannerName" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="轮播图地址" :label-width="formLabelWidth">
                <el-input v-model="form.imageUrl" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="轮播图图片" :label-width="formLabelWidth">
                <el-image style="width: 320px; height: 240px" :src="form.imageUrl" fill></el-image>
              </el-form-item>
              <el-form-item label="发布人" :label-width="formLabelWidth">
                <el-input v-model="form.createUser" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="bannerSeeClose">取 消</el-button>
              <el-button type="primary" @click="bannerSeeClose">确 定</el-button>
            </div>
          </el-dialog>

          <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
          <el-button type="primary" size="mini" @click="bannerEdit(scope.row)">编辑</el-button>
          <el-dialog title="编辑轮播图" :visible.sync="dialogFormVisibleEdit">
            <el-form :model="form">
              <el-form-item label="轮播图ID" :label-width="formLabelWidth">
                <el-input v-model="form.id" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="轮播图名称" :label-width="formLabelWidth">
                <el-input v-model="form.bannerName" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="轮播图地址" :label-width="formLabelWidth">
                <el-input v-model="form.imageUrl" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
              <el-button type="primary" @click="bannerEditend()">确 定</el-button>
            </div>
          </el-dialog>

          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          <el-popconfirm
            confirmButtonText="确认"
            cancelButtonText="取消"
            icon="el-icon-info"
            iconColor="red"
            title="确定删除吗？"
          >
            <el-button
              slot="reference"
              size="mini"
              type="danger"
              @click.native="handleDelete(scope.row.id)"
            >删除</el-button>
          </el-popconfirm>
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
  getInfoList,
  bannerDelete,
  bannerAddimg,
  bannerEdits,
  getBannerSee,
  bannerSearch,
  getPageList,
  getInfoListPage
} from "@/api/banner";
import insertComponent from "./insert.vue";
import { VueCropper } from "vue-cropper";
import updateComponent from "./update.vue";
import deleteComponent from "./delete.vue";
import selectComponent from "./select";
import ImgUpload from "@/components/upload/image";
import { uploadFile } from "@/api/upload";
import moment from "moment";
moment.locale("zh-cn");
export default {
  components: {
    updateComponent,
    VueCropper,
    ImgUpload
  },
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
      // return moment(time).format(" YYYY MMM Do, dddd, HH:mm:ss");
      return moment(time).format("L LT");
    }
  },
  data() {
    return {
      listLoading: true,
      rules: {
        bannerName: [{ required: true, message: "请填写标题", trigger: "blur" }]
        // url: [{ required: true, message: '请填写内容', trigger: 'blur' }]
      },
      list: null,
      synopsis: "",
      url: "",

      total: 0, // 总条数
      pageSize: 10, // 每页的数据条数
      listIndex: 0, // 在列表中的index数

      currentPage: 1, // 当前页码

      formInline: {},
      page: 1,
      activeName: "0",
      pageNum: "",
      options: [],
      openPage: true,
      input3: "",
      dialogFormVisibleEdit: false,
      dialogFormVisible: false,
      dialogImageUrl: "",
      dialogFormVisibleSee: false,
      dialogFormVisibleTJ: false,
      fileList: [],
      imageUrl: "",
      form: {
        id: "",
        bannerName: "",
        imageUrl: "",
        createUser: "",
        url: ""
      },
      formLabelWidth: "120px",

      dialogVisibleTJ: false,
      dialogVisible: false,

      fileName: "", // 上传文件名称
      cropperDialogVisible: false, // 是否打开图片裁剪弹窗
      clearFiles: true, // 是否清除当前上传的logo
      fileInfo: {}, // 上传数据 似乎没用。。
      // 裁剪组件的基础配置option
      option: {
        img: "", // 裁剪图片的地址
        info: false, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: "png", // 裁剪生成图片的格式 jpeg、png、webp
        canScale: false, // 图片是否允许滚轮缩放
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1920, 560], // 截图框的宽高比例
        autoCrop: true, // 是否默认生成截图框
        full: true, // 是否输出原图比例的截图 ,,,,,,
        canMoveBox: true, // 截图框能否拖动
        original: true, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        high: true,
        size: 1,
        autoCropWidth: 1920, // 默认生成截图框宽度
        autoCropHeight: 560
      }
    };
  },
  mounted() {
    this.getList();
  },
  created() {
    if (this.getform) {
      this.form = this.getform;
    }
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    handleSuccess(file) {
      console.log(file);
      console.log(file.data.src);
      this.form.imageUrl = file.data.src;
    },
    submitUpload() {
      this.$refs.upload.submit();
      this.dialogFormVisible = false;
      this.dialogVisibleTJ = true;
    },
    // onSubmit() {
    //   this.$refs.form.validate(valid => {
    //     if (valid) {
    //       if (this.form.url.length > 0) {
    //         const url = this.form.url;
    //         if (
    //           url.indexOf("http://") === -1 ||
    //           url.indexOf("https://") === -1
    //         ) {
    //           this.form.url = "http://" + this.form.url;
    //         }
    //       }
    //       this.$emit("onSubmit", this.form);
    //     } else {
    //       this.$message("有内容没有填写！");
    //     }
    //   });
    // },
    onCancel() {
      this.$emit("onClose");
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    getList() {
      this.listLoading = true;
      console.log(this.openPage, this.currentPage, this.pageSize, this.form);
      getInfoList(
        this.openPage,
        this.currentPage,
        this.pageSize,
        this.form
      ).then(response => {
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

    bannerEdit(row) {
      console.log(row.id);
      this.form = row;
      this.dialogFormVisibleEdit = true;
    },
    bannerEditend() {
      this.listLoading = true;
      bannerEdits(this.form).then(response => {
        const result = response.data;
        console.log(result);
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }
        this.dialogFormVisibleEdit = false;
        this.getList();
        this.bannerEditClose(), (this.listLoading = false);
      });
    },
    bannerSee(id) {
      this.dialogFormVisibleSee = true;
      getBannerSee(id).then(response => {
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
    },
    bannerSeeClose() {
      this.dialogFormVisibleSee = false;
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = "";
        }
      }
    },
    bannerEditClose() {
      this.dialogFormVisibleEdit = false;
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = "";
        }
      }
    },
    bannerAddClose() {
      this.dialogFormVisible = false;
      this.dialogFormVisibleTJ = false;
      this.dialogVisibleTJ = false;

      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = "";
        }
      }

      this.getList();
    },

    handleDelete(id) {
      console.log(id);
      bannerDelete(id).then(response => {
        const result = response.data;
        console.log(result);
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }
        this.getList();
      });
    },
    bannerAdd() {
      bannerAddimg(this.form).then(response => {
        const result = response.data;
        console.log(result);
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }

        this.bannerAddClose();
      });
      // this.form=''\
    },
    search() {
      this.form.bannerName = this.input3;
      console.log(this.form);
      bannerSearch(this.form, this.openPage).then(response => {
        const result = response.data;
        console.log(result);
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
          this.form.bannerName = "";
        }
      });
    },
    handleAvatarSuccess(imageUrl, res, file) {
      console.log(imageUrl, res, file, "789");
      this.form.imageUrl = imageUrl;
      this.fileName = file.name;
      this.option.img = imageUrl;
      this.$nextTick(() => {
        this.option.img = imageUrl;
        this.cropperDialogVisible = true;
      });
    },
    finish() {
      this.clearFiles = false;
      var formData = new FormData();
      this.$refs.cropper.getCropBlob(data => {
        formData.append("file", data, this.fileName);
        uploadFile(formData).then(response => {
          console.log(response.data.data.src);
          // this.form.image = this.serverip + response.data.data.src;
          this.form.imageUrl = response.data.data.src;
          this.cropperDialogVisible = false;
          this.dialogVisibleTJ = true;
          // this.dialogFormVisible = false;
          console.log(this.form.imageUrl)

          this.$message.success("上传成功！");
        });
      });
    },
    closeUpload() {
      this.cropperDialogVisible = false;
    },

    // handleClick(index, row) {
    //   console.log(index, row);
    // },
    // handleCurrentChange(val) {
    //   this.currentPage = val;
    //   this.getList();
    // }

    handleSizeChange(val) {
      console.log("789");
      this.currentPage += 1;
      this.fetchData();
    },
    handleCurrentChange(val) {
      console.log("456");
      this.currentPage = val;

      this.fetchData();
    },
    fetchData() {
      this.listLoading = true;

      (this.currentPage = 2),
        (this.pageSize = 10),
        console.log(
          "是否开启",
          this.openPage,
          "行数",
          this.pageSize,
          "页数",
          this.currentPage,
          this.form,
          "78542"
        );
      getInfoListPage(
        this.openPage,

        this.pageSize,
        this.currentPage,
        this.form
      ).then(response => {
        const result = response.data;
        console.log(result);
        if (result) {
          const data = result.data;
          this.list = data.data;
          this.currentPage = data.pageNum;
          this.total = data.count;
        }
        this.listLoading = false;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.cropper-content {
  .cropper {
    width: calc(100% - 200px);
    height: 340px;
    display: inline-block;
  }
}
</style>
