const moment = require(`moment`)
const debug = require(`debug`)(`qnzl:watchers:graph:existio`)
const fetch = require(`node-fetch`)

const existIOUrl = process.env.EXISTIO_URL

module.exports = {
  attributes: async (parent, args, context, info) => {
    debug(`getting multiple attributes`)

    const res = await fetch(`${existIOUrl}/api/get/attributes/multiple`, {
      headers: context
    })

    return res.json()
  },

  attribute: async (parent, args, context, info) => {
    const { name, date} = args

    debug(`getting a attribute ${name}: ${date}`)

    const res = await fetch(`${existIOUrl}/api/get/attributes/single?attribute=${name}`, {
      headers: context
    })

    let { results } = await res.json()

    debug(`got results, filtering for the date`)

    if (date) {
      results = results.filter((attr) => {
        return moment(attr.date).isSame(date)
      })
    }

    debug(`got ${results.length} results`)

    return results
  },

  insights: async (parent, args, context, info) => {
    debug(`getting insights`)

    const res = await fetch(`${existIOUrl}/api/get/insights/multiple`, {
      headers: context
    })

    const body = await res.json()

    debug(`got insights:`, body)

    return body.results
  },

  insight: async (parent, args, context, info) => {
    const { basedOn } = args

    debug(`getting insight for attribute ${basedOn}`)

    const res = await fetch(`${existIOUrl}/api/get/insights/single?attribute=${basedOn}`, {
      headers: context
    })

    const body = await res.json()

    debug(`got result for ${basedOn} attribute insight:`, body)

    return body.results[0]
  },

  averages: async (parent, args, context, info) => {
    debug(`getting multiple attributes`)

    const res = await fetch(`${existIOUrl}/api/get/averages/multiple`, {
      headers: context
    })

    debug(`got multiple attributes`)

    return res.json()
  },

  average: async (parent, args, context, info) => {
    const { name } = args

    debug(`getting average for ${name}`)

    const res = await fetch(`${existIOUrl}/api/get/averages/single?attribute=${name}`, {
      headers: context
    })

    debug(`got averages`)

    return res.json()
  },

  correlations: async (parent, args, context, info) => {
    debug(`getting correlations`)

    const res = await fetch(`${existIOUrl}/api/get/correlations/multiple`, {
      headers: context
    })

    debug(`got correlations`)

    return res.json()
  },

  correlation: async (parent, args, context, info) => {
    const { basedOn } = args

    debug(`get correlation for attribute ${basedOn}`)

    const res = await fetch(`${existIOUrl}/api/get/correlations/single?attribute=${basedOn}`, {
      headers: context
    })

    const body = await res.json()

    debug(`got correlation for attribute ${basedOn}: `, body)

    return body.results
  }
}
