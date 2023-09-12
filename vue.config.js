// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'
// 本地环境是否需要使用cdn
const devNeedCdn = false

// cdn链接
const cdn = {
    // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
    externals: {
        // web3: 'Web3',
        // '@walletconnect/web3-provider': 'WalletConnectProvider',
    },
    // cdn的js链接
    js: [
        // 'https://resource.pteg.io/js/web3.js',
        // 'https://cdn.idlemystic.io/download/js/torus-embed.js',
        // 'https://cdn.idlemystic.io/download/js/Portis.js',
        // 'https://cdn.idlemystic.io/download/jsfile03301/walletconnect.js'
    ]
}

const host = require('ip').address()
console.log("777",host);
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
    // publicPath: '/BIL/',
    // outputDir: 'dist/BIL/',
    publicPath: './',
    outputDir: 'dist',
    productionSourceMap: false,
    devServer: {
        // host,
        port: 8080,
        https: false,
        open: true,
        // proxy: 'https://xqadmin.ikanke.cn:10443/ywapi/',
        // proxy: {
        //     "/DnaServe": {
        //         target: "http://192.168.10.100:8088",
        //         changeOrigin: true,
        //     },
        // },
    },
    chainWebpack: config => {
        // config.resolve.symlinks(true); // 修复热更新失效
        config.resolve.alias
            .set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@common', resolve('src/assets/common'))
            .set('@h5', resolve('src/assets/h5'))
            .set('@web', resolve('src/assets/web'))
            .set('@components', resolve('src/components'))
            .set('@mixins', resolve('src/mixins'))
            .set('@views', resolve('src/views'))
            .set('@store', resolve('src/store'))
            .set('@wallet', resolve('src/wallet'));
        // ============注入cdn start============
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'FreeStyle3X3'
                if (isProduction || devNeedCdn){
                args[0].cdn = cdn
                }
                return args
            })
        // ============注入cdn start============
    },
    configureWebpack: config => {
        // 用cdn方式引入，则构建时要忽略相关资源
        if (isProduction || devNeedCdn) config.externals = cdn.externals 
    }
}

