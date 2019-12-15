const { resolve } = require('path')
const { gql } = require('apollo-server-express')
const fs = require('fs')

const getSchema = () => {
  const files = fs.readdirSync(resolve(__dirname))

  let schemas = files.map((file) => {
    if (file.includes(`graphql`)) {
      return fs.readFileSync(resolve(__dirname, file))
    }
  })

  schemas = schemas.filter(Boolean)
    .map(String)
    .join('\n')

  console.log("SCHEMAS:", schemas)
  return gql(schemas)
}

module.exports = getSchema
