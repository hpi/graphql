const fetch = require('node-fetch')

module.exports = {
  trello: () => {
  },
  plaid: () => {

  },
  todoist: (parent, args, context, info) => {
    return fetch(`https://2c99f9c4.ngrok.io/api/get`, {
        method: `GET`,
        headers: {
          'Authorization': `Bearer`
        }
      })
      .then((res) => {
        return res.json()
      })
  },
  existio: () => {

  },
  activityWatch: () => {

  }
}
