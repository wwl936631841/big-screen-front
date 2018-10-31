const build = require('../nenv/server/build')
const dir = __dirname
console.log(dir)

build(dir)
.then(() => {
  console.log('a')
})
.catch(err => {
  console.log(err)
    // process
})