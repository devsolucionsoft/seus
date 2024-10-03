module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://3.233.173.228:5003/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
};