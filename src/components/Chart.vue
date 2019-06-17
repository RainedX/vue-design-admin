<template>
  <div ref="main"></div>
</template>

<script>
import echarts from 'echarts'
import { addListener, removeListener } from 'resize-detector'
import debounce from 'lodash/debounce'

export default {
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      chart: null
    }
  },
  created () {
    this.resize = debounce(this.resize, 300)
  },
  mounted () {
    addListener(this.$refs.main, this.resize)
    this.renderChart()
  },
  beforeDestroy () {
    removeListener(this.$refs.main, this.resize)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    resize () {
      this.chart.resize()
    },
    renderChart () {
      // 基于准备好的dom，初始化echarts实例
      this.chart = echarts.init(this.$refs.main)
      this.chart.setOption(this.options)
    }
  },
  watch: {
    options: {
      handler (val) {
        console.log(val)
        this.chart.setOption(val)
      },
      deep: true
    }
  }
}
</script>

<style>

</style>
