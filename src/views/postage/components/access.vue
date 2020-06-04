<template>
  <VChart :options="polar" />
</template>

<script>
import VueECharts from 'vue-echarts'
import 'echarts'

export default {
  components: {
    VChart: VueECharts
  },
  data() {
    return {
      polar: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar'
        }]
      }
    }
  }
}
</script>

<style>
</style>
