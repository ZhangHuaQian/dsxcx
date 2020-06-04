<template>
  <div>
    <el-upload
      ref="upload"
      :action="ip"
      :on-success="handleSuccess"
      :on-remove="handleRemove"
      :before-upload="beforeImageUpload"
      :file-list="imagesList"
      :auto-upload="false"
      multiple
      list-type="picture"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">（上传文件请先“点击上传到服务器”）</div>
    </el-upload>
  </div>
</template>

<script>
import { ip4Img } from '@/api/upload.js'
export default {
  props: {
    setImgs: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      ip: ip4Img,
      imagesList: []
    }
  },
  mounted() {
    if (this.formImageList) {
      this.imagesList = JSON.parse(this.formImageList)
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleSuccess(response, file, fileList) {
      this.imagesList = fileList
      var list = []
      for (var i = 0; i < this.imagesList.length; i++) {
        if (this.imagesList[i].response) {
          this.imagesList[i].url = this.imagesList[i].response.data.src
        }
        list.push({
          name: this.imagesList[i].name,
          url: this.imagesList[i].url
        })
      }
      this.$emit('getImagesList', JSON.stringify(list))
    },
    handleRemove(file, fileList) {
      this.imagesList = fileList
    },
    beforeImageUpload(file) {
      const isIMG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt25M = file.size / 1024 / 1024 < 25
      if (!isIMG) {
        this.$message.error('上传封面图片只能是图片格式!')
      }
      if (!isLt25M) {
        this.$message.error('上传封面图片大小不能超过 25MB!')
      }
      return isIMG && isLt25M
    }
  }
}
</script>

<style scoped>

</style>
