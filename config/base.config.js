const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
const baseConfig = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  filenameHashing: true,
  pages: {
    index: {
      // 入口文件
      entry: 'src/main.js',
      // 模板文件
      template: 'public/index.html',
      // 输出文件
      filename: 'index.html',
      // 页面title
      title: '首页'
    }
  },
  transpileDependencies: [/* string or regex */],
  // 是否为生产环境构建生成 source map？
  productionSourceMap: process.env.NODE_ENV !== 'production',
  // 使用CDN的时候启用，增加安全性
  integrity: false,
  // 调整内部的 webpack 配置。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/webpack.md
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
    config.resolve.alias.set('vue$', 'vue/dist/vue.esm.js')
    config.resolve.extensions.add('.js').add('.vue').add('.json')
  },
  configureWebpack: config => {
    config.watch = true
    config.optimization = {
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_console: true, // console
              drop_debugger: false,
              pure_funcs: ['console.log', 'console.info'] // 移除console
            }
          }
        })
      ]
    }
  },
  // CSS 相关选项
  css: {
    // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: true,
    // 是否开启 CSS source map？
    sourceMap: false,
    // 为预处理器的 loader 传递自定义选项。比如传递给
    // sass-loader 时，使用 `{ sass: { ... } }`。
    loaderOptions: {},
    // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    // 这个选项不会影响 `*.vue` 文件。
    requireModuleExtension: true
  },
  // 在生产环境下为 Babel 和 TypeScript 使用 `thread-loader`
  // 在多核机器下会默认开启。
  parallel: require('os').cpus().length > 1,
  // PWA 插件的选项。
  // 查阅 https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli-plugin-pwa/README.md
  pwa: {},
  // 三方插件的选项
  pluginOptions: {
  }
}

module.exports = baseConfig
