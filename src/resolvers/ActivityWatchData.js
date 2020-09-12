const fetch = require(`node-fetch`)
const debug = require(`debug`)(`qnzl:watchers:graph:aw-data`)
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

    debug(`getting productivity from ${url}`)

    const res = await fetch(url, {
      headers: context
    })

    try {
      const { classification } = await res.json()

      debug(`got classification`)

      return classification
    } catch (e) {
      debug(`got error while retrieving classification: `, e)

      return `neutral`
    }
  }
}
