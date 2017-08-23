let server = require('./server')
let router = require('./router')
let handle = require('./handleRequest')
handle['/'] = handle['/start']
server.start(router.route,handle)