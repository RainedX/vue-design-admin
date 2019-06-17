module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.easy-mock.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api/dashboard/chart': '/mock/59ed4d3556439355d2266c7e/example/dashboard/chart' // rewrite path
        }
      }
    }
  }
}
