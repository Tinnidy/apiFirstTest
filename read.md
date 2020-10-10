《全栈之巅》

1、 node express框架搭建服务端代码

2、 nodemon 执行server.js文件  
    自动监听文件更改，重启服务器，不必每次都自己手动执行；
	
3、 建立项目->npm init(初始化项目，index.js默认为项目的入口文件，
	一般都选默认值,出现package.json文件) -> npm install packagename --save安装包；
	
4、 服务端托管静态资源文件：
     新建public文件夹 -> app.use()【中间件，用于处理静态文件的托管】
	 
5、 服务端处理跨域 cors是一个函数，所以可以直接执行它
     安装cors包 -> app.use(require('cors')())
	 
6、 服务端操作MongoDB数据库
          6.1 先下载安装mongodb数据库
          （https://www.mongodb.com/dr/fastdl.mongodb.org/windows/mongodb-windows-x86_64-4.4.1-signed.msi/download）
          6.2 npm 安装可以连接mongodb数据库的中间件 mongoose
          6.3 定义表结构
          6.4 接口异步请求数据
          
7、 使用RESET Client发送post其他请求，执行本地操作，每个请求用###分隔开

8、 服务端使用post请求的接口需要使用req.body接收客户端传递的参数
     app.use(express.json())      //允许服务端处理客户端发送过来的数据

9、 修改表数据  使用put请求进行数据覆盖

          找出需要修改的数据项；
          修改数据值；
          使用.save()方法保存修改的数据
          返回修改结果；

