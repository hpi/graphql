const moment = require(`moment`)
const fetch = require(`node-fetch`)

const existIOUrl = process.env.EXISTIO_URL

module.exports = {
  attributes: async (parent, args, context, info) => {
    const res = await fetch(`${existIOUrl}/api/attributes/multiple`, {
      headers: context
    })

    return res.json()
  },

  attribute: async (parent, args, context, info) => {
    const { name, date} = args

    const res = await fetch(`${existIOUrl}/api/attributes/single?attribute=${name}`, {
      headers: context
    })

    let { results } = await res.json()

    if (date) {
      results = results.filter((attr) => {
        return moment(attr.date).isSame(date)
      })
    }

    return results
  },

  insights: async (parent, args, context, info) => {
    const res = await fetch(`${existIOUrl}/api/insights/multiple`, {
      headers: context
    })

    const body = await res.json()

    return body.results
  },

  insight: async (parent, args, context, info) => {
    const { basedOn } = args

    const res = await fetch(`${existIOUrl}/api/insights/single?attribute=${basedOn}`, {
      headers: context
    })

    const body = await res.json()

    return body.results[0]
  },

  averages: async (parent, args, context, info) => {
    const res = await fetch(`${existIOUrl}/api/averages/multiple`, {
      headers: context
    })

    return res.json()
  },

  average: async (parent, args, context, info) => {
    const { name } = args

    const res = await fetch(`${existIOUrl}/api/averages/single?attribute=${name}`, {
      headers: context
    })

    return res.json()
  },

  correlations: async (parent, args, context, info) => {
    const res = await fetch(`${existIOUrl}/api/correlations/multiple`, {
      headers: context
    })

    return res.json()
  },

  correlation: async (parent, args, context, info) => {
    const { basedOn } = args

    const res = await fetch(`${existIOUrl}/api/correlations/single?attribute=${basedOn}`, {
      headers: context
    })

    const body = await res.json()

    return body.results
  }
}
