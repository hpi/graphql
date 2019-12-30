const fetch = require(`node-fetch`)

const awUrl = process.env.AW_URL

module.exports = {
  buckets: async (parent, args, context, info) => {
    const res = await fetch(`${awUrl}/api/v1/buckets`, {
      headers: {
        authorization: context.authorization
      }
    })

    let { buckets } = await res.json()

    const formattedBuckets = buckets.map((bucketId) => {
      return {
        id: bucketId
      }
    })

    return body
  },
  bucket: async (parent, args, context, info) => {
    const { id } = args

    const res = await fetch(`${awUrl}/api/v1/get/${id}/today`, {
      headers: {
        authorization: context.authorization
      }
    })

    const body = await res.json()

    return body
  }
}
