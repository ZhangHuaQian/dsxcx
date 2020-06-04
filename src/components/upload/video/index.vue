<template>
  <div>
    <el-upload
      class="upload-video"
      drag
      :action="ip"
      :show-file-list="false"
      :on-success="handleSuccess"
      :before-upload="beforeVideoUpload"
      accept=".mp4,.rmvb,.avi,.MP4,.RMVB,.AVI"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <!--        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
    </el-upload>
    <video-player
      v-if="VideoSrc"
      ref="videoPlayer"
      class="video-player-box"
      :options="playerOptions"
      :playsinline="true"
      custom-event-name="customstatechangedeventname"
    />
  </div>
</template>

<script>
import { ip4Video } from '@/api/upload.js'
import { videoPlayer } from 'vue-video-player'
export default {
  components: {
    videoPlayer
  },
  props: {
    setVideo: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      ip: ip4Video,
      VideoSrc: '',
      playerOptions: {
        width: 500,
        height: 250,
        muted: true,
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: []
      }
    }
  },
  methods: {
    handleSuccess(res, file) {
      this.listLoading = false
      this.VideoSrc = res.data.url
    },
    beforeVideoUpload(file) {
      const isVDO = file.type === 'video/mp4' || file.type === 'video/rmvb' || file.type === 'video/avi'
      if (!isVDO) {
        this.$message.error('视频格式错误！')
      }
      this.listLoading = true
      return isVDO
    }
  }
}
</script>

<style>
</style>
