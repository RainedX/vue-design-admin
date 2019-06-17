<template>
  <div>
    <chart :options="options" style="width: 600px;height:400px;"></chart>
  </div>
</template>

<script>
import Chart from '../../components/Chart'
import axios from 'axios'

export default {
  data () {
    return {
      options: {
        title: {
          text: 'ECharts示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
  },
  mounted () {
    this.getChartData()
  },
  methods: {
    getChartData () {
      axios.get('/api/dashboard/chart', { params: { id: 123 } })
        .then(res => {
          this.options = {
            title: {
              text: 'ECharts示例'
            },
            tooltip: {},
            xAxis: {
              data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: res.data.data
            }]
          }
        })
    }
  },
  components: {
    Chart
  }
}
</script>

<style>

</style>
