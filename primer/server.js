let http = require('http')
let url = require('url')

let start = (route, handle) => {
	/**
	 * [创建一个服务器，每当服务器收到一个请求时，都会调用回调函数]
	 * @param  {[function]} (req, res           [回调函数,处理请求]
	 * @return {[http.Server]}       [返回http.Server实例]
	 */
	let server = http.createServer((req, res) => {
		let _url = req.url
		let pathname = url.parse(_url).pathname
		let postData = ''
		route(pathname, handle, req, res)
		
	})
	/*
		监听8080端口
	 */
	server.listen(8080)
	console.log('server has started')
} 
exports.start = start