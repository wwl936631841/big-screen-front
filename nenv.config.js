//const webpack = require('webpack')
module.exports = {
    // 项目nginx部署地址
    assetPublicPath: '/big-screen/',
    // 项目相关的配置
    project: {
        // 定义项目的标题
        title: "数据监控大平台",
        login_page_title: "数据监控大平台",
        login_page_title_en: "Data monitoring platform"
    },
    proxy: {
        '/api/*': {
            target: 'http://192.168.37.6:8591', // 平台
            // target: 'http://localhost:8591', // 本地
            filter(pathname, req) {
                if (pathname.match(/\/api/)) {
                    return true
                }
            }
        }
    },
    webpack(config, { dev }, webpack) {
        // if (true) { // 开发环境配置
        //     config.plugins.push(
        //         new webpack.DefinePlugin({
        //             'process.env.BASE_URL': "'api'",
        //             //'process.env.SSO_URL': "'http://192.168.37.6:8567/sso/index.html#/'",
        //             //'process.env.GIS_BASE_URL': "'http://192.168.37.6:8580/onemap/'", //GIS地图URL
        //             //'process.env.MONITOR_BASE_URL': "'http://192.168.37.6:8580/monitor/'", //在线监控系统URL 

        //             //'process.env.COMMON': "'http://192.168.37.6:8599/api'"
        //         }),
        //     )
        // } else { // 生产环境配置


        // }

        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.BASE_URL': "'api'",
            })
        )

        config.plugins.push(
            new webpack.DefinePlugin({
                'process.env.SOCKET_URL': "'http://192.168.31.88:8092'"
            })
        )
        return config
    }
}