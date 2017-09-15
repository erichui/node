let os = require('os')
let hostname = os.hostname()
let i = 0
let netArr = os.networkInterfaces().en0
let IPv4 = netArr.filter((item) => {
  return item.family === 'IPv4'
})[0].address
module.exports = {
  ip: IPv4,
  hostname
}
