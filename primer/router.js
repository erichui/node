let route = (pathname, handle, req, res) => {
	if (typeof handle[pathname] === 'function') {
		handle[pathname](req, res)
	} else {
		res.writeHead(404, {
			'content-type': 'text-plain'
		})
		res.write('404 not found')
		res.end()
	}
}

exports.route = route