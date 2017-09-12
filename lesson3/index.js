let http = require('http')
const PORT = 3030
let redis = require('redis')
let client = redis.createClient()
let count = 0
let server = http.createServer((req, res) => {
  res.writeHead(200, {
    'content-type': 'text-html'
  })
  res.write(`欢迎你第${count}次访问服务器`)
  client.set('demo', `服务器被访问的次数i:${i}`)
  client.get('demo', (error, response) => {
    if (error) {
      console.log(err)
    }
    console.log(response)
    res.write(response)
    res.end()
  })
  i++
})
server.listen(PORT)
