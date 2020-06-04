<template>
  <el-upload
    ref="upload"
    class="upload-file"
    :action="ip"
    :on-change="handleChange"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :file-list="fileList"
    :auto-upload="false"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
    <!--    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
  </el-upload>
</template>

<script>
import { ip4File } from '@/api/upload.js'
export default {
  props: {
    setFiles: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      ip: ip4File,
      readyList: [],
      fileList: []
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleChange(file, fileList) {
      this.readyList = this.fileList
    },
    handleSuccess(response, file, fileList) {
      this.readyList = []
      this.fileList = fileList
      this.$emit('handleUpload', this.fileList)
    },
    handleRemove(file, fileList) {
      this.fileList = []
      fileList.filter((item, index, arr) => {
        if (item.status === 'success') {
          this.fileList.push(item)
        } else {
          for (var i = 0; i < this.readyList.length; i++) {
            if (this.readyList[i].url === item.url) {
              this.readyList.splice(i, 1)
              return false
            }
          }
        }
      })
      this.$emit('handleUpload', this.fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>
<style>

</style>
