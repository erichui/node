exports.name = 'b'
console.log('b.js', require('./a').name)
exports.name = 'bb'