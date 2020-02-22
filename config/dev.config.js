const devConfig = {
  lintOnSave: true,
  runtimeCompiler: true,
  // 配置 webpack-dev-server 行为。
  devServer: {
    open: process.platform === 'darwin',
    host: process.env.VUE_APP_HOST,
    port: process.env.VUE_APP_PORT,
    https: process.env.NODE_ENV === 'production',
    hotOnly: false,
    // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/cli-service.md#配置代理
    proxy: {
      '/api': { target: 'http://localhost:8080/api', changeOrigin: true, secure: false }
    }, // string | Object
    before: app => {}
  }
}
module.exports = devConfig

// const localProxy = proxy({
//   target: backend.origin,
//   changeOrigin: true,
//   autoRewrite: true,
//   headers: {
//     host: backend.host
//   },
//   onProxyReq (proxyReq, req) {
//     Object.keys(req.headers).forEach(function (key) {
//       proxyReq.setHeader(key, req.headers[key])
//     })
//     proxyReq.setHeader('Host', backend.host)
//   },
//   onProxyRes (proxyRes, req, res) {
//     Object.keys(proxyRes.headers).forEach(function (key) {
//       res.append(key, proxyRes.headers[key])
//     })
//   }
// })
