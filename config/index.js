module.exports = {
    dev: {
        proxyTable: {
            '/graphql':{
                target: "http://localhost:9000/",
                changeOrigin: true,
                pathRewrite : {
                    '^/graphql': ''
                }
            }
        }
    }
}