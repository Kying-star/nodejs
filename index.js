/*
 * @Author: your name
 * @Date: 2020-12-02 15:03:03
 * @LastEditTime: 2020-12-03 20:50:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /request/index.js
 */
const Koa = require('koa')
    // 注意require('koa-router')返回的是函数:
const router = require('koa-router')()
    // 解析request的body的功能(post请求)
const bodyParser = require('koa-bodyparser')
    // 处理静态文件
const serve = require("koa-static")
const render = require("./src/render")

const app = new Koa()


app.use(async(ctx, next) => {
    console.log(`${ctx.method}`, `${ctx.url}`)
    await next()
    console.log(`1`)
})

// 添加 url映射(:hello URL命名参数 )
router.get('/arr', async(ctx, next) => {
    let arr = [1, 2, 3, 4]
    ctx.body = arr
})

router.get('/', async(ctx, next) => {
    let html = await render('/index.html')
    ctx.body = html
})

router.post('/postRoute', async(ctx, next) => {
    const rb = ctx.request.body
    console.log(rb)
    ctx.response.body = ctx
})

//__dirname+ “/static/html” 表示静态文件存放的路径，
//当接收到请求后，会在该路径下进行查找，serve还可以接收一个对象，表示查找文件的后缀名
app.use(serve(__dirname + "/static/html", { extensions: ['html'] }))
    //由于middleware的顺序很重要，这个koa-bodyparser必须在router之前被注册到app对象上
app.use(bodyParser())
app.use(router.routes())

app.listen(3000)