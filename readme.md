## Koa

#### helloworld

```js
const Koa = require('koa')
const app = new Koa()


app.use(async(ctx) => {
    ctx.body = 'hello world'
})
app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')
```

#### 监听路由

`ctx.request.url`

```js
const Koa = require('koa')
const app = new Koa()


app.use(async(ctx) => {
    let url = ctx.request.url
    ctx.body = url
})
app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')
```

<img src="/Users/kying-star/Library/Application Support/typora-user-images/image-20201202202959206.png" alt="image-20201202202959206" style="zoom:50%;" />

#### 定制化路由

##### 目录结构

![image-20201202204719564](/Users/kying-star/Library/Application Support/typora-user-images/image-20201202204719564.png)

##### 代码

```js
const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
    /**
     * @description: 使用promise封装异步读取文件方法
     * @param {*} page
     * @return {*}
     */
function render(page) {
    return new Promise((resolve, reject) => {
        let viewUrl = `view/${page}`
        fs.readFile(viewUrl, 'binary', (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

async function route(url) {
    let view
    switch (url) {
        case '/':
            view = 'index.html'
            break
        case '/index':
            view = '/index.html'
            break
        case '/todo':
            view = '/todo.html'
            break
        case '/404':
            view = '/40.html'
            break
        default:
            view = '404.html'
    }
    let html = await render(view)
    return html
}

app.use(async(ctx) => {
    let url = ctx.request.url
    let html = await route(url)
    ctx.body = html
})
app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')
```



上面的太麻烦了，让我们用框架自带的`koa-router`

### koa-router中间件

##### 使用koa-router

1. 路由导航
2. get请求获取参数 （ctx.query）
3. 动态路由及其获取参数（/product/:id ctx.params.id）

```js
//引入 koa模块

var Koa = require('koa');

var router = require('koa-router')(); /*引入是实例化路由** 推荐*/

//实例化
var app = new Koa();

router.get('/', async(ctx) => {
    ctx.body = "首页";

})

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
/*
 * router.allowedMethods()作用： 这是官方文档的推荐用法,我们可以
 * 看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有
 * 路由中间件最后调用.此时根据 ctx.status 设置 response 响应头 
 *
 */
app.listen(3000);
```

很清楚看到我们要使用`router.get`添加路由

使用`app.use(router.routes())`将路由挂载到koa实例app上

将ctx作为body传回

可以看到`ctx`的内容为

```json
{
    "request": {
        "method": "GET",
        "url": "/",
        "header": {
            "content-type": "application/json",
            "user-agent": "PostmanRuntime/7.26.8",
            "accept": "*/*",
            "cache-control": "no-cache",
            "postman-token": "8080ebe9-2377-4dc2-af2b-9a69c489079d",
            "host": "127.0.0.1:3000",
            "accept-encoding": "gzip, deflate, br",
            "connection": "keep-alive",
            "content-length": "39"
        }
    },
    "response": {
        "status": 200,
        "message": "OK",
        "header": {
            "content-type": "application/json; charset=utf-8"
        }
    },
    "app": {
        "subdomainOffset": 2,
        "proxy": false,
        "env": "development"
    },
    "originalUrl": "/",
    "req": "<original node req>",
    "res": "<original node res>",
    "socket": "<original node socket>"
}
```

##### 获取路由参数

这里写了一个登录的demo

```js
//引入 koa模块

var Koa = require('koa')

var router = require('koa-router')() /*引入是实例化路由** 推荐*/

//实例化
var app = new Koa()

router.get('/', async(ctx) => {
    ctx.body = ctx
})
router.get('/login', async(ctx) => {
    let temp = { username: ctx.query.id, password: ctx.query.password }
    console.log(temp)
    if (temp.username != 'lqx') {
        ctx.body = '用户名错误'
    } else {
        ctx.body = temp
    }

})

app.use(router.routes()) /*启动路由*/
app.use(router.allowedMethods())
    /*
     * router.allowedMethods()作用： 这是官方文档的推荐用法,我们可以
     * 看到 router.allowedMethods()用在了路由匹配 router.routes()之后,所以在当所有
     * 路由中间件最后调用.此时根据 ctx.status 设置 response 响应头 
     *
     */
app.listen(3000)
```



### 请求数据获取

##### get请求

```js
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  let url = ctx.url
  // 从上下文的request对象中获取
  let request = ctx.request
  let req_query = request.query
  let req_querystring = request.querystring

  // 从上下文中直接获取
  let ctx_query = ctx.query
  let ctx_querystring = ctx.querystring

  ctx.body = {
    url,
    req_query,
    req_querystring,
    ctx_query,
    ctx_querystring
  }
})

app.listen(3000, () => {
  console.log('[demo] request get is starting at port 3000')
})

```

##### postman测试

![image-20201202214228119](/Users/kying-star/Library/Application Support/typora-user-images/image-20201202214228119.png)

#### post请求

```js
router.post('/postRoute', async(ctx, next) => {
    const rb = ctx.request.body
    console.log(rb)
    ctx.response.body = ctx
})
```

![image-20201203210438075](/Users/kying-star/Library/Application Support/typora-user-images/image-20201203210438075.png)

