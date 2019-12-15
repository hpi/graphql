const { resolve } = require('path')
const fs = require('fs')

const getResolvers = () => {
  const files = fs.readdirSync(resolve(__dirname))

  let resolvers = files.map((file) => {
    if (file.includes('index.js') || file.includes('.swp')) return

    const [ name, ext ] = file.split('.')

    return { [name]: require(`./${file}`) }
  })

  resolvers = resolvers.filter(Boolean)

  return resolvers
}

module.exports = getResolvers
