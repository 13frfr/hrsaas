<template>
  <div class="randarCharts" ref="main">雷达图</div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "",
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.initRadar();
  },
  computed: {},
  methods: {
    initRadar() {
      var myChart = echarts.init(this.$refs.main);
      const randarCharts = {
        title: {
          text: "人员绩效表",
        },
        tooltip: {
          trigger: "item",
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "考勤", max: 100 },
            { name: "技术", max: 100 },
            { name: "管理", max: 100 },
            { name: "分享", max: 100 },
            { name: "bug", max: 100 },
            { name: "助人", max: 100 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [40, 30, 20, 30, 50, 10],
                name: "Allocated Budget",
              },
              {
                value: [50, 10, 28, 26, 42, 21],
                name: "Actual Spending",
              },
            ],
          },
        ],
      };
      // 绘制图表
      myChart.setOption(randarCharts);
    },
  },
};
</script>
<style scoped lang="scss">
.randarCharts {
  width: 700px;
  height: 500px;
}
</style>
