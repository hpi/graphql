const debug = require(`debug`)(`qnzl:watchers:graph:aw`)
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
    debug(`gettinng buckets`)

    const res = await fetch(`${awUrl}/api/buckets`, {
      headers: context
    })

    let [ buckets ] = await res.json()

    debug(`got buckets ${buckets}`)

    const formattedBuckets = buckets.map((bucketId) => {
      return {
        id: bucketId
      }
    })

    return formattedBuckets
  },
  bucket: async (parent, args, context, info) => {
    return { id: args.id }
  }
}
