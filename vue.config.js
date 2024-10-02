module.exports = {
    devServer: {
        proxy: {
            '/v1': {
                target: 'http://3.233.173.228:5003/',
                changeOrigin: true,
                pathRewrite: { '^/v1': '' },
            }
        }
    }
};
  