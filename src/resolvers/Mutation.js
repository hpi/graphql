const moment = require(`moment`)
const debug = require(`debug`)(`qnzl:watchers:graph:mutations`)
const fetch = require(`node-fetch`)

const existIOUrl = process.env.EXISTIO_URL
const easyPostUrl = process.env.EASYPOST_URL

module.exports = {
  updateAttribute: async (parent, args, context, info) => {
    const {
      addToExisting,
      date,
      name
    } = args

    let attrValue = 0
    if (addToExisting) {
      debug(`get current attribute value for ${name} on ${date}`)

      const getAttrRes = await fetch(`${existIOUrl}/api/get/attributes/single?attribute=${name}&date=${moment(date).format()}`, {
        headers: Object.assign({ 'Content-Type': `application/json` }, context),
      })

      const { results } = await getAttrRes.json()

      if (results && results.length > 0) {

        const attr = results[0]

        attrValue = attr.value || 0
      }

      debug(`current value for ${name} on ${date}: `, attrValue)
    }

    args.value = Number(args.value)
    args.value += Number(attrValue)

    debug(`updating attribute ${name} to ${args.value}`)

    const res = await fetch(`${existIOUrl}/api/attributes/update/`, {
      method: `POST`,
      headers: Object.assign({ 'Content-Type': `application/json` }, context),
      body: JSON.stringify(args)
    })

    const body = await res.json()

    debug(`updated attribute: `, body)

    return body
  },

  addShipment: async (parent, args, context, info) => {
    debug(`adding shipment`)

    const res = await fetch(`${easyPostUrl}/api/packages/add`, {
      method: `POST`,
      headers: Object.assign({ 'Content-Type': `application/json` }, context),
      body: JSON.stringify(args)
    })

    const body = await res.json()

    debug(`added shipment: `, body)

    return body
  }
}
