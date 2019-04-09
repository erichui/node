const arr = [0, 1, 2, 3]

/**
 * [split array to chunks of given size]
 * @method
 * @param  {Number} [len=1] [chunk length]
 * @return {[type]}         [arr]
 * [[0, 1, 2, 3, 4]].chunk(2) ==> [[0, 1], [2, 3], [4]]
 */
Array.prototype.chunk = function(len = 1) {
  if(!Array.isArray(this)) {
    throw new TypeError(`Expected Array, got $(typeof arr)`)
  }
  let ret = []


  // this.forEach((item, index) => {
  //   const remainder = index % len
  //   const quotient = parseInt(index / len)
  //   if(ret[quotient]) {
  //     ret[quotient][remainder] = item
  //   } else {
  //     ret[quotient] = [item]
  //   }
  // })
  // return ret

  // npm  better
  for(var i = 0; i < this.length; i += len) {
    ret.push(this.slice(i, i+len))
  }
  return ret
}


Array.prototype.group = function(key) {
  return this.reduce((accumulator, currentVal) => {
    const val = currentVal[key]
    if(accumulator[val]) {
      accumulator[val].push(currentVal)
    } else {
      accumulator[val] = [currentVal]
    }
    // console.log(accumulator)
    return accumulator
  }, {})
}




var groupArr = [
  {tag: 'one', content: 'A'},
  {tag: 'one', content: 'B'},
  {tag: 'two', content: 'C'},
  {tag: 'two', content: 'D'},
  {tag: 'three', content: 'E'},
  {tag: 'three', content: 'F'}
]
// console.log(groupArr.group('tag'))


try {
  setTimeout(() => {
    throw Error('asdf')
  }, 1000)
} catch(e) {
  console.log(e)
}
