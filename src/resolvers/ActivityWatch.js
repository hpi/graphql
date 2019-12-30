const fetch = require(`node-fetch`)

const awUrl = process.env.AW_URL

const buildQueryString = (query) => {
  const queryStrings = Object.keys(query).map((key) => {
    return `${key}=${query[key]}`
  })

  return queryStrings.join(`&`)
}

module.exports = {
  buckets: async (parent, args, context, info) => {
    const res = await fetch(`${awUrl}/api/v1/buckets`, {
      headers: context
    })

    let { buckets } = await res.json()

    const formattedBuckets = buckets.map((bucketId) => {
      return {
        id: bucketId
      }
    })

    return formattedBuckets
  },
  bucket: async (parent, args, context, info) => {
    const { id, before, after } = args

    const queryString = buildQueryString({ before, after })

    const res = await fetch(`${awUrl}/api/v1/get/${id}/${(!after && `today`) || ``}?${queryString}`, {
      headers: context
    })

    const { data } = await res.json()

    return data
  }
}
