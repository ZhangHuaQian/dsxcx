<template>
  <div class="app-container">
    <div style="margin-top: 15px;margin-bottom: 50px;width:20vw">
      <el-input placeholder="请输入内容" v-model="input3" class="input-with-select" clearable>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
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
      <el-table-column label="订单编号" width="180" align="center">
        <template v-slot="scope">{{ scope.row.orderCode }}</template>
      </el-table-column>
      <el-table-column label="收货人" width="180" align="center">
        <template v-slot="scope">{{ scope.row.consignee }}</template>
      </el-table-column>
      <el-table-column label="收货地址" width="180" align="center">
        <template v-slot="scope">{{ scope.row.address }}</template>
      </el-table-column>

      <el-table-column label="下单时间" width="360" align="center">
        <template v-slot="scope">{{ scope.row.orderTime | modifyTime }}</template>
      </el-table-column>
      <el-table-column label="订单状态{0:未付款 1:待发货 2:已发货 3:已完成 4:已取消}" width="180" align="center">
        <template v-slot="scope">{{ scope.row.status }}</template>
      </el-table-column>

      <el-table-column label="联系电话" width="180" align="center">
        <template v-slot="scope">{{ scope.row.phone }}</template>
      </el-table-column>
      <el-table-column label="订单总价" width="180" align="center">
        <template v-slot="scope">{{ scope.row.totalPrices }}</template>
      </el-table-column>
      <el-table-column label="微信订单号" width="180" align="center">
        <template v-slot="scope">{{ scope.row.transactionId }}</template>
      </el-table-column>
      <el-table-column label="微信用户名" width="180" align="center">
        <template v-slot="scope">{{ scope.row.wxUserNickName }}</template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="270">
        <template v-slot="scope">
          <el-button size="small" type="primary" @click="handleClick(scope.row)">订单详情</el-button>
          <el-button size="mini" @click="handleEdit(scope.row)">更新</el-button>
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
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button> -->
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

    <!-- 订单详情开始 -->

    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->

    <el-dialog title="订单详情" :visible.sync="dialogFormVisibleInfo">
      <el-form :model="form">
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="收货人" :label-width="formLabelWidth">
          <el-input v-model="form.consignee" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单完成时间" :label-width="formLabelWidth">
          <el-input v-model="form.dealTime" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单发货时间" :label-width="formLabelWidth">
          <el-input v-model="form.deliverTime" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单ID" :label-width="formLabelWidth">
          <el-input v-model="form.id" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="是否评价" :label-width="formLabelWidth">
          <!-- <el-radio v-model="form.isReview" label="0">否</el-radio>
          <el-radio v-model="form.isReview" label="1">是</el-radio>-->

          <el-radio-group v-model="form.isReview">
            <el-radio :disabled="true" :label="0">否</el-radio>
            <el-radio :disabled="true" :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="订单编号" :label-width="formLabelWidth">
          <el-input v-model="form.orderCode" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单生成时间" :label-width="formLabelWidth">
          <el-input v-model="form.orderTime" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单付款时间" :label-width="formLabelWidth">
          <el-input v-model="form.payTime" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单总价" :label-width="formLabelWidth">
          <el-input v-model="form.totalPrices" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
          <el-radio-group v-model="form.status">
            <el-radio :disabled="true" :label="0">未付款</el-radio>
            <el-radio :disabled="true" :label="1">待发货</el-radio>
            <el-radio :disabled="true" :label="2">已发货</el-radio>
            <el-radio :disabled="true" :label="3">已完成</el-radio>
            <el-radio :disabled="true" :label="4">已取消</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="微信支付订单号" :label-width="formLabelWidth">
          <el-input v-model="form.transactionId" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="微信用户名" :label-width="formLabelWidth">
          <el-input v-model="form.wxUserNickName" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="微信用户id" :label-width="formLabelWidth">
          <el-input v-model="form.wxUserId" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisibleInfo = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogFormVisibleInfo = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 订单详情结束 -->
    <!-- 订单更新开始 -->
    <el-dialog title="订单更新" :visible.sync="dialogFormVisibleUpdata">
      <el-form :model="form">
        <el-form-item label="订单编号" :label-width="formLabelWidth">
          <el-input v-model="form.orderCode" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        
        <el-form-item label="微信用户名" :label-width="formLabelWidth">
          <el-input v-model="form.wxUserNickName" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" :label-width="formLabelWidth">
           <el-radio-group v-model="form.status">
            <el-radio  :label="0">未付款</el-radio>
            <el-radio  :label="1">待发货</el-radio>
            <el-radio  :label="2">已发货</el-radio>
            <el-radio  :label="3">已完成</el-radio>
            <el-radio  :label="4">已取消</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleUpdata = false">取 消</el-button>
        <el-button type="primary" @click="OrderUpdate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 订单更新结束 -->
  </div>
</template>

<script>
import { getInfoList, getDelete, ManageInfo,orderEdit } from "@/api/orderManage";
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
      listLoading: true,
      list: null,
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 10, // 每页的数据条数
      formInline: {},
      activeName: "0",
      options: [],
      input3: "",
      form: {
        address: "1",
        consignee: "1",
        dealTime: "1", //订单完成时间
        deliverTime: "", //订单发货时间
        id: "32817aa6cbad9503747802b9577f7814", //订单id
        isReview: 0, //是否评价商品 0否1是
        orderCode: "202005220001", //订单编号
        orderTime: "2020-05-22 17:43:08", //订单生成时间
        payTime: null, //订单付款时间
        phone: "114514", //联系电话
        // productList: [//订单商品
        //     {
        //         "id": "5b95c8697b324a0b3bab034e38948c17",
        //         "orderId": "32817aa6cbad9503747802b9577f7814",
        //         "productId": "1",
        //         "productImage": "1",
        //         "productName": "",
        //         "productNum": 3,
        //         "productPrice": 1.88,
        //         "productValue": "a/a",
        //         "productValueId": "1,1"
        //     }
        // ],
        remark: "备注", //买家留言
        status: 0, //订单状态 0未付款 1待发货 2已发货 3已完成 4已取消
        totalPrices: 44.5, //订单总价
        transactionId: "", //微信支付订单号（用于退款）
        wxUserId: "1", //微信用户id
        wxUserNickName: "超级管理员", //用户昵称
        wxUserOpenid: "admin" //用户openid，
      },
      dialogFormVisibleInfo: false,
      dialogFormVisibleUpdata: false,
      formLabelWidth: '120px'
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    
    getList() {
      this.listLoading = true;
      console.log(this.currentPage, this.pageSize, "11111");
      const data = {
        openPage: this.openPage,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        form: this.form
      };
      getInfoList(data).then(response => {
        const result = response.data;
        console.log(result, "getlist");
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }
        this.listLoading = false;
      });
    },
    handleEdit(row) {
      this.dialogFormVisibleUpdata=true
      this.form=row
    },
    handleDelete(row) {
      this.listLoading = true;
      getDelete(row).then(response => {
        const result = response.data;
        console.log(result, "deletelist");
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
        }
        
      });
      this.getList();
        this.listLoading = false;
    },
    handleClick(row) {
      this.listLoading = true;
      (this.dialogFormVisibleInfo = true),
        ManageInfo(row).then(response => {
          const result = response.data;
          console.log(result, "infolist");
          if (result) {
            const data = result.data;
            this.list = result.data;
            this.currentPage = result.pageNum;
            this.total = result.count;
            // this.form=result.data
          }

          
        });
        this.getList();
        this.listLoading = false;
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
    OrderUpdate(){
      this.listLoading = true;
      console.log(this.form.status,this.form.id,'订单状态')
      orderEdit(this.form).then(response => {
        const result = response.data;
        console.log(result, "订单更新");
        if (result) {
          const data = result.data;
          this.list = result.data;
          this.currentPage = result.pageNum;
          this.total = result.count;
          this.dialogFormVisibleUpdata=false
        }
        this.listLoading = false;
      });
      this.getList();
      
    }
  }
};
</script>

<style scoped>
</style>
