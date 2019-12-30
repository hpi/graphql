const fetch = require('node-fetch')

const todoistUrl = process.env.TODOIST_URL
const trelloUrl = process.env.TRELLO_URL
const plaidUrl = process.env.PLAID_URL
const awUrl = process.env.AW_URL

module.exports = {
  trello: (parent, args, context, info) => {
    return fetch(`${trelloUrl}/api/dump`, {
        method: `GET`,
        headers: {
          'Authorization': context.authorization
        }
      })
      .then((res) => {
        return res.json()
      })
  },
  plaid: () => {
    return fetch(`${plaidUrl}/api/dump`, {
        method: `GET`,
        headers: {
          'Authorization': context.authorization
        }
      })
      .then((res) => {
        return res.json()
      })
  },
  todoist: (parent, args, context, info) => {
    return fetch(`${todoistUrl}/api/dump`, {
        method: `GET`,
        headers: {
          'Authorization': context.authorization
        }
      })
      .then((res) => {
        return res.json()
      })
  },
  existio: () => {
    return {}
  },
  activityWatch: () => {
    return {}
  }
}
