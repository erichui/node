const express = require('express')
const supperagent = require('superagent')
const cheerio = require('cheerio')
const eventproxy = require('eventproxy')
const async = require('async')
const url = require('url')
const app = express()
let cnodeUrl = 'https://cnodejs.org/'
app.get('/', (req, res, next) => {
	supperagent.get(cnodeUrl)
		.end((err, sres) => {
			if (err) {
				console.log('ERR111111')
			} else {
				const $ = cheerio.load(sres.text);
				let items = []
				let urlArr = $('#topic_list .topic_title').map((index, val) => {
        	return url.resolve(cnodeUrl, $(val).attr('href'))
        }).get()
				urlArr.length = 40
				async.mapLimit(urlArr, 5, (url, callback) => {
					supperagent.get(url)
						.end((err, sres1) => {
							let $ = cheerio.load(sres1.text)
							// items.push({
							// 	title: $('.topic_full_title').text().trim(),
							// 	href: url,
							// 	author: $('.reply_author').eq(0).text().trim()
							// 	comment: $('.reply_content').eq(0).text().trim()
							// })
							callback(null, {
								title: $('.topic_full_title').text().trim(),
								href: url,
								author: $('.reply_author').eq(0).text().trim(),
								comment: $('.reply_content').eq(0).text().trim()
							})
						})
				}, (err, ret) => {
					if (err) {
						console.log('err', err)
					} else {
						// console.log('res', res)
						res.send(ret)
					}
				})
				// let ep = new eventproxy()
				// ep.after('eventName', urlArr.length, (retArr) => {
				// 	items = retArr.map((val) => {
				// 		let href = val[0]
				// 		let $ = val[1]
				// 		let title = $('.topic_full_title').text().trim()
				// 		let author = $('.reply_author').eq(0).text().trim()
				// 		let comment = $('.reply_content').eq(0).text().trim()
				// 		return {
				// 			title,
				// 			href,
				// 			author,
				// 			comment
				// 		}
				// 	})
				// 	res.send(items)
				// })
				// urlArr.forEach((urlVal,index) => {
				// 	supperagent.get(urlVal)
				// 		.end((err, sres) => {
				// 			if (err) {
				// 				console.log(err)
				// 			} else {
				// 				ep.emit('eventName',[urlVal, cheerio.load(sres.text)])
				// 			}
				// 		})
				// })
			}
		})
})

app.listen(3030, () => {
	console.log('listening port 3030')
})