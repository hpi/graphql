const moment = require(`moment`)
const fetch = require(`node-fetch`)

const existIOUrl = process.env.EXISTIO_URL

module.exports = {
  updateAttribute: async (parent, args, context, info) => {
    let attrValue = 0
    if (args.addToExisting) {
      const res = await fetch(`${existIOUrl}/api/get/attributes/single?attribute=${args.name}&date=${moment(args.date).format()}`, {
          headers: Object.assign({ 'Content-Type': `application/json` }, context),
      })

      const { results } = await res.json()

      console.log(`mutation results:`, results)
      if (results && results.length > 0) {

        const attr = results[0]

        console.log("ATTR:", attr.value)
        attrValue = attr.value || 0
      }
    }

    console.log(`updating attribute `, existIOUrl, args)

    args.value = Number(args.value)
    args.value += Number(attrValue)

    const res = await fetch(`${existIOUrl}/api/attributes/update/`, {
        method: `POST`,
        headers: Object.assign({ 'Content-Type': `application/json` }, context),
        body: JSON.stringify(args)
    })

    const body = await res.json()

    console.log(`updated attribute: `, body)

    return body
  },

}
