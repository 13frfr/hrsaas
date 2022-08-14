<!-- 导入页面 -->
<template>
  <div class="login-container">
    <div class="app-container">
      <upload-excel
        :beforeUpload="excelSuccess"
        :onSuccess="onSuccess"
      ></upload-excel>
    </div>
  </div>
</template>

<script>
// 引入路径映射表
import employees from "@/constant/employees";
const { importMapKeyPath } = employees;
import { importEmployees } from "@/api/employees";
import { formatTime } from "@/filters/index";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 上传前的处理
    excelSuccess({ name }) {
      if (!name.endsWith(".xlsx")) {
        this.$message.error("请上传xlsx文件");
        return false;
      }
      return true;
    },
    async onSuccess({ header, results }) {
      const newArr = results.map((item) => {
        const obj = {};
        for (let key in importMapKeyPath) {
          if (key === "入职日期" || key === "转正日期") {
            // excel 时间戳
            const timestamp = item[key];
            // 转换
            const data = new Date((timestamp - 1) * 24 * 3600000);
            data.setFullYear(data.getFullYear() - 70);
            obj[importMapKeyPath[key]] = formatTime(data);
          } else {
            obj[importMapKeyPath[key]] = item[key];
          }
        }
        return obj;
      });
      // console.log(newArr);
      await importEmployees(newArr);
      this.$message.success("导入员工成功");
      this.$router.go(-1);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
};
</script>
<style scoped></style>
