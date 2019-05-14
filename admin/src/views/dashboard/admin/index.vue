<template>
  <div class="dashboard-editor-container">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

  </div>
</template>

<script>
import PanelGroup from './components/pannel'
import LineChart from './components/linechart'
import { getCompleteOrderNum, getAverageConsumption, getIncome, getProductCount } from '@/api/statics'

const lineChartData = {
  CompleteOrderNum: {
    actualData: [100, 120, 161, 134, 105, 160, 165]
  },
  AverageConsumption: {
    actualData: [200, 192, 120, 144, 160, 130, 140]
  },
  Income: {
    actualData: [80, 100, 121, 104, 105, 90, 100]
  },
  ProductCount: {
    actualData: [130, 140, 141, 142, 145, 150, 160]
  }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: lineChartData.CompleteOrderNum
    }
  },
  created() {
    getCompleteOrderNum().then((res) => {
      lineChartData.CompleteOrderNum.actualData = res.data
    })
    getAverageConsumption().then((res) => {
      lineChartData.AverageConsumption.actualData = res.data
    })
    getIncome().then((res) => {
      lineChartData.Income.actualData = res.data
    })
    getProductCount().then((res) => {
      lineChartData.ProductCount.actualData = res.data
    })
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
