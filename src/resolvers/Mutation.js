const moment = require(`moment`)
const fetch = require(`node-fetch`)

const existIOUrl = process.env.EXISTIO_URL

module.exports = {
  updateAttribute: async (parent, args, context, info) => {
    console.log(`updating attribute `, existIOUrl, args)
    const res = await fetch(`${existIOUrl}/api/update-attribute`, {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': `application/json` }, context),
        body: JSON.stringify(args)
    })

    const body = await res.json()

    console.log(`updated attribute: `, body)

    return body
  }
}
