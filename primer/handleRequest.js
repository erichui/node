module.exports = {
	['/start'] (res) {
		let body = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<title>Document</title>
			</head>
			<body>
				<form action="/upload" method = 'post'>
					<textarea name="" id="" cols="30" rows="10"></textarea>
					<input type="submit" value="submit value">
				</form>
			</body>
			</html>
		`
		res.writeHead(200, {
			'Content-type': 'text-plain'
		})
		res.write(body)
		res.end()
	},
	['/upload'] (res, postData) {
		res.writeHead(200, {
			'content-type': 'text-plain'
		})
		res.write('start postData:' + postData)
		res.end()
	}
}