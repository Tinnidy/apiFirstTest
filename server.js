// 1. 模块化引用包=>初始化实例
const express = require('express')

//2. 服务器应用实例
const app = express()

//允许服务端处理客户端发送过来的json数据
app.use(express.json())

//3. 定义路由  get方法(请求req, 响应res) 
//3.1 请求首页, 返回home页面  接口1
app.get('/', function(req, res){
	res.send({page: 'home'})
})

//3.2 请求about接口,返回about页面
app.get('/about', function(req, res){
	res.send({page: 'about us'})
})

//3.3 请求products接口,返回数据  异步操作
app.get('/products',  async function(req, res){
	//3.3.1    limit限制两条数据
	// const data = await Product.find().limit(2)
	//3.3.2    跳过一条显示两条数据skip(1)   实现分页效果
	// const data = await Product.find().skip(1).limit(5)
	//3.3.3    按照_id进行排序   
	const data = await Product.find().sort({_id: -1}) 
	res.send(data)     //.find()是查找所有记录
})

//3.4 请求产品详情接口 定义动态变量 :id,绑定字符id作为参数  5f7d188f1db1f450c80f6624
app.get("/products/:id", async function(req, res){
	const data = await Product.findById(req.params.id) //解析客户端传递的参数
	res.send(data)

})

//3.5 通过接口新增数据 post请求  数据量更大，更安全
//    使用REST Client扩展(VScode插件) 发起post 请求 
app.post("/products", async function(req, res){
	const data = req.body
	const product = await Product.create(data)   //插入的数据
	res.send(product)                     //返回的表模型
})

//3.6 指定路径进行修改 put整个覆盖 patch是部分修改
app.put('/products/:id', async function(req, res){
	const product = await Product.findById(req.params.id)
	product.title = req.body.title
	await product.save()         //保存修改的表模型
	res.send(product)
})

//3.7 使用delete请求方法删除数据
app.delete('/products/:id', async function(req, res){
	const product = await Product.findById(req.params.id)
	await product.remove()
	res.send({code: 0})
})


//4 托管静态文件  所有public里面的文件都可以直接被访问(可控访问逻辑)
app.use('/app',express.static('public'))

//5 解决跨域问题  需要安装跨域包
app.use(require('cors')())

//6 使用mongoose 动态查询数据库查询数据
const mongoose = require('mongoose')     //连接mongodb数据库的驱动
//6.1 参数2解决旧版报错警告
mongoose.connect('mongodb://localhost:27017/baseTest', {useNewUrlParser:true})
//6.2 建立模型,表结构(表名，表属性字段)
const Product = mongoose.model('Product', new mongoose.Schema({
	title: String,
}))
//6.3 插入多条数据到表模型中  只需要运行一次，不然数据会越来越多
// Product.insertMany([
// 	{title: '产品1号'},
// 	{title: '男友1号'},
// 	{title: '男友2号'},
// 	{title: '男友3号'},
// 	{title: '男友4号'},
// 	{title: '男友5号'}
// ])

// 4. 监听服务3000端口  启动
app.listen(3000, ()=>{
	console.log('app listening on port 3000')
});
