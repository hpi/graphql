
const moment = require(`moment`)
const fetch = require(`node-fetch`)

const easyPostUrl = process.env.EASYPOST_URL

module.exports = {
  shipment: async (parent, args, context, info) => {
    const res = await fetch(`${easyPostUrl}/api/packages/${args.trackingCode}`, {
      headers: context
    })

    return await res.json()
  },

  shipments: async (parent, args, context, info) => {
    const res = await fetch(`${existIOUrl}/api/get/attributes/multiple`, {
      headers: context
    })

    return res.json()
  },

}
