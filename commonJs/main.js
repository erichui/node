let libObj = require('./lib')
let {
	counter,
	addCount
} = libObj
console.log(libObj.counter)
libObj.addCount()
// libObj.counter++
console.log(libObj.counter)