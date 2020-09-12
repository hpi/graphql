const moment = require(`moment`)
const debug = require(`debug`)(`qnzl:watchers:graph:easypost`)
const fetch = require(`node-fetch`)

const easyPostUrl = process.env.EASYPOST_URL

module.exports = {
  shipment: async (parent, args, context, info) => {
    debug(`getting shipment from ${args.trackingCode}`)

    const res = await fetch(`${easyPostUrl}/api/packages/${args.trackingCode}`, {
      headers: context
    })

    return res.json()
  },

  shipments: async (parent, args, context, info) => {
    debug(`getting shipments`)

    const res = await fetch(`${existIOUrl}/api/get/attributes/multiple`, {
      headers: context
    })

    return res.json()
  },

}
