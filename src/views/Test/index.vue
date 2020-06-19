<template>
<div>111</div>
 

</template>



<script>



import { getInfoList } from "@/api/homeManage";
import Vue from "vue";
import { pca, pcaa } from "area-data"; // v5 or higher
import "vue-area-linkage/dist/index.css"; // v2 or higher
import VueAreaLinkage from "vue-area-linkage";


import moment from "moment";
moment.locale("zh-cn");
export default {
  components: {
    //  quillEditor
  },
  filters: {
    statusFilter: value => {},
    modifyTime(time) {
      return moment(time).format(" YYYY MMM Do, dddd, HH:mm:ss");
    }
  },
  data() {
    return {
      editFormInLine:'',
      editorOption:'',
      // content:'',
      field:{
        content:''
      }
      
    };
  },
  created() {
    
    
  },
  mounted() {},
  methods: {
   
  }
};
</script>

<style scoped>
 
</style>
