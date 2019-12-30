const fetch = require('node-fetch')

const todoistUrl = process.env.TODOIST_URL
const trelloUrl = process.env.TRELLO_URL
const plaidUrl = process.env.PLAID_URL
const awUrl = process.env.AW_URL

module.exports = {
  trello: async (parent, args, context, info) => {
    const res = await fetch(`${trelloUrl}/api/dump`, {
        method: `GET`,
        headers: context
      })

    const boards = await res.json()

    return { boards }
  },
  plaid: async (parent, args, context, info) => {
    const res = await fetch(`${plaidUrl}/api/dump`, {
        method: `GET`,
        headers: context
      })

    const body = await res.json()

    body._transactions = Object.assign({}, body.transactions)
    body._accounts = Object.assign({}, body.accounts)

    body.transactions = [].concat(...Object.values(body.transactions))
    body.accounts = [].concat(...Object.values(body.accounts))

    return body
  },
  todoist: async (parent, args, context, info) => {
    const res = await fetch(`${todoistUrl}/api/dump`, {
        method: `GET`,
        headers: context
      })

    const body = await res.json()

    return body
  },
  existio: () => {
    return {}
  },
  activityWatch: () => {
    return {}
  }
}
