<!--  -->
<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      :file-list="fileList"
      :http-request="onRequest"
      list-type="picture-card"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      class="custom-upload"
      :class="fileList.length ? 'hide' : ''"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="previewImgDialog">
      <img :src="imgUrl" />
    </el-dialog>
  </div>
</template>

<script>
// id:AKIDfMuDH5fz2qPiqlTxB9sLZXFhurYzA5PT
// key:tYx85nGVVGn9HAoEPN7ctviGagX9XgbH
import COS from "cos-js-sdk-v5";
var cos = new COS({
  SecretId: "AKIDfMuDH5fz2qPiqlTxB9sLZXFhurYzA5PT",
  SecretKey: "tYx85nGVVGn9HAoEPN7ctviGagX9XgbH",
});
// console.log(cos);

export default {
  name: "UploadImg",
  //import引入的组件需要注入到对象中才能使用`
  components: {},
  data() {
    //这里存放数据
    return {
      fileList: [],
      previewImgDialog: false,
      imgUrl: "",
      loading: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    onRequest({ file }) {
      this.loading = true;
      cos.putObject(
        {
          Bucket: "hmhr-31-1313341589" /* 桶名字 */,
          Region: "ap-shanghai" /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: "STANDARD",
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData));
          },
        },
        (err, data) => {
          this.loading = false;
          if (err || data.statusCode !== 200) {
            // console.log(err);
            return this.$message.error("上传失败");
          }
          this.$emit("onSuccess", {
            url: "https://" + data.Location,
          });
        }
      );
    },
    onChange(file, fileList) {
      this.fileList = fileList;
    },
    onRemove(file, fileList) {
      this.fileList = fileList;
    },
    onPreview(file) {
      //   console.log(file);`
      this.previewImgDialog = true;
      this.imgUrl = file.url;
    },
    beforeUpload(file) {
      // 可以上传的图片类型
      const types = ["image/jpeg", "image/gif"];
      if (!types.includes(file.type)) {
        this.$message.error("请选择" + types.join(",") + "图片");
        return false;
      }
      //   限制上传的图片大小
      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        this.$message.error("选择的图片不能超过2mb");
        return false;
      }
      //   console.log("上传前的检查", file);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
};
</script>
<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
