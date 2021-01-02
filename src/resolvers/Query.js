const debug = require(`debug`)(`qnzl:watchers:graph:query`)
const fetch = require('node-fetch')

const todoistUrl = process.env.TODOIST_URL
const trelloUrl = process.env.TRELLO_URL
const plaidUrl = process.env.PLAID_URL
const awUrl = process.env.AW_URL

module.exports = {
  trello: async (parent, args, context, info) => {
    debug(`getting trello dump`)

    const res = await fetch(`${trelloUrl}/api/pull`, {
        method: `GET`,
        headers: context
      })

    const boards = await res.json()

    debug(`got trello boards`)

    return { boards }
  },
  plaid: async (parent, args, context, info) => {
    debug(`getting plaid dump`)

    const res = await fetch(`${plaidUrl}/api/pull`, {
        method: `GET`,
        headers: context
      })

    const body = await res.json()

    debug(`got plaid dump`)

    body._transactions = Object.assign({}, body.transactions)
    body._accounts = Object.assign({}, body.accounts)

    body.transactions = [].concat(...Object.values(body.transactions))
    body.accounts = [].concat(...Object.values(body.accounts))

    debug(`cleaned up plaid dump`)
    debug(`got ${body.transactions.length} transactions`)
    debug(`got ${body.accounts.length} accounts`)

    return body
  },
  todoist: async (parent, args, context, info) => {
    debug(`getting todoist dump`)

    const res = await fetch(`${todoistUrl}/api/pull`, {
        method: `GET`,
        headers: context
      })

    const body = await res.json()

    debug(`got todoist dump`)

    return body
  },
  existio: () => {
    return {}
  },
  activityWatch: () => {
    return {}
  },
  easyPost: () => {
    return {}
  },
}
