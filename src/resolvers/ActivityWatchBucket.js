const fetch = require(`node-fetch`)

const awUrl = process.env.AW_URL

const buildQueryString = (query) => {
  const queryStrings = Object.keys(query).map((key) => {
    if (!query[key]) return ``

    return `${key}=${query[key]}`
  }).filter(Boolean)

  return queryStrings.join(`&`)
}

module.exports = {
  activity: async (parent, args, context, info) => {
    const { before, after } = args
    const { id } = parent

    const queryString = buildQueryString({ before, after })

    const res = await fetch(`${awUrl}/api/v1/get/${id}/${(!after && !before && `today`) || ``}?${queryString}`, {
      query: args,
      headers: context
    })

    const { data } = await res.json()

    return data
  },
}
