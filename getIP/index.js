let http = require('http')
const PORT = 4040
let newObj = require('./getIp')
let server = http.createServer((req, res) => {
  res.writeHead(200, {
    "content-type": "text/plain"
  })
  res.write(JSON.stringify(newObj))
  res.end()
})
server.listen(PORT)
