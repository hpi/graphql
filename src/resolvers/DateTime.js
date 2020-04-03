const { GraphQLScalarType, Kind } = require('graphql')
const moment = require(`moment-timezone`)

const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'DateTime parsed into UTC and formatted to ISO-8601',
  serialize(value) {

    return moment(value).utc().format()
  },
  parseValue(value) {

    return moment(value)
  },
  parseLiteral(ast) {
    switch (ast.kind) {
      case Kind.Int:
      // return a literal value, such as 1 or 'static string'
    }
  }
})

module.exports = DateTimeScalar
