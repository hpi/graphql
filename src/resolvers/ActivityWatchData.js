const fetch = require(`node-fetch`)
const { URL } = require(`url`)

const awUrl = process.env.AW_URL

module.exports = {
  productivity: async (parent, args, context, info) => {
    let url

    if (parent.app) {
      url = `${awUrl}/api/productivity/app/${parent.app}`
    } else if (parent.url) {
      // We need the hostname without all of the other cruft
      let productivityUrl = new URL(parent.url)
      productivityUrl = productivityUrl.hostname

      if (!productivityUrl) return `neutral`

      url = `${awUrl}/api/productivity/url/${productivityUrl}`
    } else {
      return `neutral`
    }

    const res = await fetch(url, {
      headers: context
    })

    try {
      const { classification } = await res.json()

      return classification
    } catch (e) {
      console.log("EE:", e)

      return `neutral`
    }
  }
}
