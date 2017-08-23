exports.name = 'a'
console.log('a.js', require('./b').name)
exports.name = 'aa'