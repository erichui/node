const fs = require('fs')
const { promisify } = require('util') 

const fsReaddir = promisify(fs.readdir)
const fsReadFile = promisify(fs.readFile)
const fsStat = promisify(fs.stat)

const dirHandle = async (filename) => {
  const files = await fsReaddir(`${__dirname}/${filename}`)
  console.log(`(${files.length} files)`)
  for(let childFile of files) {
    console.log(`   -   ${childFile}`)
  }
}
const read = async (files, stats) => {
  try {
    console.log(' ')
    process.stdout.write(`  enter your choice: `)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
    process.stdin.on('data', async(num) => {
      num = Number(num)
      const filename = files[num]
      if(!filename) {
        return process.stdout.write('  enter your choice: ')
      }
      try {
        process.stdin.pause()
        if(stats[num].isDirectory()) {
          await dirHandle(filename)
        } else {
          const data = await fsReadFile(`${__dirname}/${filename}`, 'utf8')
          console.log(' ')
          console.log(data.replace(/(.*)/g, '   $1'))
        }
      } catch(e) {
        console.log('error')
        
        console.log(e)
      } 
    })
  } catch(e) {
    return new Error(e)
  }
}

const _readDir = async () => {
  try {
    const files = await fsReaddir(process.cwd())    
    console.log(' ')
    if(!files.length) {
      return console.log('  no files to show\n')
    }
    console.log('select which file or directory you want to see\n')
    
    const stats = []
    const fileFn = async (i) => {
      const file = files[i]
      console.log(` ${i}---${file}`)
      const stat = await fsStat(`${__dirname}/${file}`)
      stats[i] = stat
      if(++i === files.length) {
        const _err = await read(files, stats)
        if(_err) throw _err
      } else {
        fileFn(i)
      }
    }
    fileFn(0)
  } catch(e) {
    console.log(e)
  }
}

_readDir()
