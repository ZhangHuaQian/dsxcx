<template>
  <div class="home-container">
    <!-- <el-row :gutter="20">
      <el-col :md="15">
        <el-row style="text-align: center;">
          <el-col :md="5">
            <p>浏览器、按月排序</p>
            <p>659</p>
          </el-col>
          <el-col :md="5">
            <p>用户数、按月排序</p>
            <p>69</p>
          </el-col>
          <el-col :md="5">
            <p>订单数、按月排序</p>
            <p>1569</p>
          </el-col>
          <el-col :md="5">
            <p>地区、按月排序</p>
            <p>459.00</p>
          </el-col>
          <el-col :md="5">
            <p>男女占比、按月排序</p>
            <p>83</p>
          </el-col>
          <el-col :md="5">
            <p>总金额、按月排序</p>
            <p>83</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row> -->


    <el-row style="margin:7% 10%" type="flex" class="row-bg" justify="space-around">
      <el-col :span="5">
        <div class="grid-content">
          <div>统计</div>
          <div>浏览率、按月排序</div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content">
          <div>统计</div>
          <div>用户数、按月排序</div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content">
          <div>统计</div>
          <div>订单数、按月排序</div>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin:7% 10%" type="flex" justify="space-around">
     <el-col :span="5">
        <div class="grid-content">
          <div>统计</div>
          <div>地区、按月排序</div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content">
          <div>统计</div>
          <div>用户数、按月排序</div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content">
          <div>统计</div>
          <div>总金额、按月排序</div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import transaction from './components/transaction.vue'
  import access from './components/access.vue'

  export default {
    name: 'Home',
    components: {
      transaction,
      access
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>
  /* .home-container{
  padding: 20px;
  background-color: #eaeaea;
}
.box2-right-item {
  padding: 5px;
  height: 12.5rem;
}
.box2-right-item-number {
  font-size: 2rem;
} */


  el-row {
    margin-bottom: 20px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  el-col {
    border-radius: 4px;
  }

  .grid-content {
    border: 1px solid #999;
    padding: 50px 0;
  }
  .grid-content div{
    text-align: center;
  }

</style>
