module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://seusapi.solucionsoft.com/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
};