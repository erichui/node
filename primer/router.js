let route = (pathname, handle, res, postData) => {
	console.log('~~~~!!!!!~~~~~')
	console.log(postData)
	console.log('~~~~!!!!!~~~~~')
	if (typeof handle[pathname] === 'function') {
		handle[pathname](res, postData)
	} else {
		res.writeHead(404, {
			'content-type': 'text-plain'
		})
		res.write('404 not found')
		res.end()
	}
}

exports.route = route