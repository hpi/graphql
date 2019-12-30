const fetch = require(`node-fetch`)

const awUrl = process.env.AW_URL

module.exports = {
  activity: async (parent, args, context, info) => {
    const { id } = parent

    const res = await fetch(`${awUrl}/api/bucket/${id}/events`, {
      headers: {
        authorization: context.authorization
      }
    })

    const body = await res.json()

    return body
  },
}
