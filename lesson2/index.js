let async = require('async')
console.log(async.mapLimit)
let urls = new Array(30).fill('www.test.com').map((item, index) => {
	return item + '_' + index
})
let fetchUrl = (function () {
	let concurrencyCount = 0
	return function (url, callback) {
		concurrencyCount++
		let delay = Math.floor(Math.random() * 2001)
		console.log(concurrencyCount, url, delay)
		setTimeout(() => {
			concurrencyCount--
			callback(null, 11);
		}, delay)
	}
})()
async.mapLimit(urls, 5, fetchUrl, (err, res) => {
	if (err) {
		console.log('err', err)
	} else {
		console.log('res', res)
	}
})
