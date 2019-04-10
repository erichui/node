const fs = require('fs')

fs.readdir(process.cwd(), (err, files) => {
  if(err) {
    return console.log(err)
  }
  console.log('')
  if(!files.length) {
    return console.log('no files')
  }
  console.log('select which file or directory you want to see\n')
})
