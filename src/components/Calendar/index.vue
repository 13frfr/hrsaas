<!-- 日历 -->
<template>
  <div class="calendar">
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select v-model="currentYear" @change="updateCalendar">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="currentMonth" @change="updateCalendar">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }">
        <div class="cell-box">
          {{ date.getDate() }}
          <span v-if="isWeek(date)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      currentYear: "",
      years: [],
      currentMonth: "",
      currentDate: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.initcaldndar();
  },
  //方法集合
  methods: {
    initcaldndar() {
      const date = new Date();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
      this.years = Array(11)
        .fill(this.currentYear - 5)
        .map((item, i) => item + i);
      this.currentDate = date;
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0;
    },
    // 用于更新日历
    updateCalendar() {
      this.currentDate = this.currentYear + "-" + this.currentMonth;
    },
  },
};
</script>
<style scoped lang="scss">
::v-deep .el-calendar {
  .el-calendar__header {
    display: none;
  }
  .el-calendar-table td {
    border: none !important;
  }
  .cell-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    span {
      color: #fff;
      width: 20px;
      height: 20px;
      text-align: center;
      line-height: 20px;
      background-color: #fa7c4d;
      border-radius: 50%;
      margin-left: 10px;
    }
  }
}
</style>
