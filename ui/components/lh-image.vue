<template>
  <!-- 
    Usage:
      src: ""
      width: 100px —— 传入空字符串表示显示原图宽度
      height: 100px —— 传入空字符串表示显示原图高度
    
    eg.
      <lh-image src="http://qn-cover.feheadline.com/usup/20191115152153252545.gif" width="100px" height="100px"></lh-image>
  -->
  <div>
    <img :src="src" :height="this.$attrs.height" :width="this.$attrs.width" @click="handleImageClick" />
    <!-- 预览图片 -->
    <el-image-viewer v-if="preview.display" :url-list="[src]" :on-close="handleClosePreview" />
  </div>
</template>

<script>
import ElImageViewer from "element-ui/packages/image/src/image-viewer";

export default {
  name: "lh-image",
  props: {
    src: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      preview: {
        display: false
      }
    };
  },
  methods: {
    handleImageClick() {
      this.preview.display = true;
      this.$nextTick(() => {
        let el = this.$refs.image_viewer.$el;
        el.addEventListener("click", event => {
          this.preview.display = false;
        });
      });
    },
    handleClosePreview() {
      this.preview.display = false;
    }
  },
  components: {
    ElImageViewer
  }
};
</script>
