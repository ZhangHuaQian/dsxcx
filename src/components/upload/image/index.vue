<template>
  <el-upload
    class="image-uploader"
    :action="ip"
    accept=".jpg,.jpeg,.JPG,.JPEG,.png,.PNG"
    :show-file-list="false"
    :on-success="onAvatarSuccess"
    :before-upload="beforeImageUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="image">
    <i v-else class="el-icon-plus image-uploader-icon" />
  </el-upload>
</template>

<script>
import { ip4Img } from '@/api/upload.js'
import { ip } from '@/api/imageUpload.js'
import { serverip } from '@/utils/serverIP'
export default {
  props: {
    geturl: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      ip: ip4Img,
      imageUrl: this.geturl
    }
  },
   watch: {
    geturl(val) {
      if (val) {
        this.imageUrl = val
      }
    }
  },
  created() {
    if (this.geturl) {
      this.imageUrl = serverip + this.geturl
    }
  },
  // mounted() {
  //   if (this.formImage) {
  //     console.log(formImage,'89595')
  //     this.imageUrl = this.formImage
  //   }
  // },
  methods: {
    
    onAvatarSuccess(res, file, fileList) {
      console.log(file,'45646',res,'jb')
      
      console.log(res,'res')
      // this.$message.success('上传成功！')
      // this.imageUrl = serverip + data.src
       this.imageUrl = res
      this.$emit('onAvatarSuccess', this.imageUrl, res, file, fileList)
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
  .image-uploader /deep/ .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .image-uploader /deep/ .el-upload:hover {
    border-color: #409EFF;
  }
  .image-uploader /deep/ .image-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 180px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .image {
    width: 180px;
    height: 120px;
    display: block;
  }
</style>
