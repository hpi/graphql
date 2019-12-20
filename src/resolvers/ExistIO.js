const fetch = require(`node-fetch`)

const existIOUrl = ``
module.exports = {
  attributes: async (parent, args, context, info) => {
    const res = await fetch(`${existIOUrl}/api/attributes/multiple`, {
      headers: {
        authorization: context.authorization
      }
    })

    return res.json()
  },

  attribute: async (parent, args, context, info) => {
    const { name } = args

    const res = await fetch(`${existIOUrl}/api/attributes/single?attribute=${name}`, {
      headers: {
        authorization: context.authorization
      }
    })

    const body = await res.json()

    return body.results
  },

  insights: async (parent, args, context, info) => {
    const res = await fetch(`${existIOUrl}/api/insights/multiple`, {
      headers: {
        authorization: context.authorization
      }
    })

    const body = await res.json()

    return body.results
  },

  insight: async (parent, args, context, info) => {
    const { basedOn } = args

    const res = await fetch(`${existIOUrl}/api/insights/single?attribute=${basedOn}`, {
      headers: {
        authorization: context.authorization
      }
    })

    const body = await res.json()

    return body.results[0]
  },

  averages: async (parent, args, context, info) => {
    const res = await fetch(`${existIOUrl}/api/averages/multiple`)

    return res.json()
  },

  average: async (parent, args, context, info) => {
    const { name } = args

    const res = await fetch(`${existIOUrl}/api/averages/single?attribute=${name}`, {
      headers: {
        authorization: context.authorization
      }
    })

    return res.json()
  },

  correlations: async (parent, args, context, info) => {
    const res = await fetch(`${existIOUrl}/api/correlations/multiple`, {
      headers: {
        authorization: context.authorization
      }
    })

    return res.json()
  },

  correlation: async (parent, args, context, info) => {
    const { basedOn } = args

    const res = await fetch(`${existIOUrl}/api/correlations/single?attribute=${basedOn}`, {
      headers: {
        authorization: context.authorization
      }
    })

    const body = await res.json()

    return body.results
  }
}
