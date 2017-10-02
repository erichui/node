let http = require('http')
const PORT = 3030
let fs = require('fs')
let url = require('url')
let path = require('path')
let mime = require('./mime').types


/*
  创建服务器
 */
let server = http.createServer((req, res) => {
  let _url = url.parse(req.url)
  let pathname = _url.pathname
  let realPath = `assets${pathname}`
  let ext = path.extname(realPath)
  let contentType = mime[ext] ? mime[ext] : 'text/plain'
  fs.readFile(realPath, 'binary', (err, fsRes) => {
    console.log(fsRes)
    if (err) {
      res.writeHead(500, {
        'content-type': 'text/plain'
      })
      res.end('err')
    } else {
      console.log('sucess')
      res.writeHead(200, {
        'content-type': contentType
      })
      res.write(fsRes, 'binary')
      res.end()
    }
  })
})
server.listen(PORT)
console.log('listening port 3030')
