const fetch = require(`node-fetch`)

module.exports = {
  attributes: (parent, args, context, info) => {

  },

  attribute: (parent, args, context, info) => {
    const { name } = args
  },

  insights: (parent, args, context, info) => {

  },

  insight: (parent, args, context, info) => {
    const { basedOn } = args
  },

  averages: (parent, args, context, info) => {

  },

  average: (parent, args, context, info) => {
    const { name } = args
  },

  correlations: (parent, args, context, info) => {
  }

  correlation: (parent, args, context, info) => {
    const { basedOn } = args
  }
}
