let fs = require('fs')
let zlib = require('zlib')

let gzip = zlib.createGzip()
let gunzip = zlib.createGunzip()
let readS = fs.createReadStream('./source.txt')
let writeS = fs.createWriteStream('./destination.txt.gz')

readS.pipe(gzip).pipe(writeS)
readS.pipe(gunzip).pipe(writeS)

// readS.on('end', () => {
//   console.log('done')
// })
// gunzip.on('error', (err) => {
//   console.log('err', err)
// })
