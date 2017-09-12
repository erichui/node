let fs = require('fs')
let formidable = require('formidable')
module.exports = {
	['/start'] (req, res) {
		let body = `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<title>Document</title>
			</head>
			<body>
				<form action="/upload" enctype="multipart/form-data"
			    method="post">
			    <input type="file" name="upload" multiple="multiple"><br>
			    <input type="submit" value="Upload">
		    </form>
			</body>
			</html>
		`
		res.writeHead(200, {
			'Content-type': 'text-html'
		})
		res.write(body)
		res.end()
	},
	['/upload'] (req, res) {
		let form = new formidable.IncomingForm()
		form.parse(req, (err, fields, files) => {
			console.log(files.upload.path)
			fs.renameSync(files.upload.path, 'tmp/test.png')
			res.writeHead(200, {
				'content-type': 'text/html'
			})
			res.write("received image:<br/>");
    	res.write("<img src='/show' />");
		})
	},
	['/show'] (req, res) {
		fs.readFile('tmp/test.png', 'binary', (err, file) => {
			if(err) {
				res.writeHead(500, {"Content-Type": "text/plain"});
	      res.write(err + "\n");
	      res.end();
			} else {
				res.writeHead(200, {
					'content-type': 'image/png'
				})
				res.write(file, 'binary')
				res.end()
			}
		})
	}
}