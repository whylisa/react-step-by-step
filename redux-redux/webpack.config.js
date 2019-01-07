const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },

  devServer: {
    open: true,
    port: 3000,

    // 添加反向代理的配置
    // https://webpack.js.org/configuration/dev-server/#devserver-proxy
    // https://github.com/chimurai/http-proxy-middleware#http-proxy-options
    // http://www.jianshu.com/p/3bdff821f859
    proxy: {
      // 使用：/api/movie/in_theaters
      // 访问 ‘/api/movie/in_theaters’ ==> 'https://api.douban.com/v2/movie/in_theaters'

      // '/api' 的作用：用来告诉 webpack-dev-server 以 /api 开头的所有请求
      // 都由你来代理
      '/api': {
        // 代理的目标服务器地址
        target: 'https://api.douban.com/v2',
        // https请求需要该设置
        secure: false,
        // 必须设置该项
        changeOrigin: true,
        // '/api/movie/in_theaters' 路径重写为：'/movie/in_theaters'
        // 如果没有该配置，最终的接口地址为：https://api.douban.com/v2/api/movie/in_theaters
        pathRewrite: { '^/api': '' }
      }
    }
  },

  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(png|jpg|jpeg|gif)$/, use: 'url-loader' },
      // 配置解析 JSX/ES6 语法的loader
      { test: /\.js/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html')
    })
  ]
}
