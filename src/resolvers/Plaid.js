const fetch = require('node-fetch')

module.exports = {
  transactions: (parent, args, context, info) => {
    return args.accountId ? parent.transactions[args.accountId] : parent.transactions
  },
  account: (parent, args, context, info) => {
    return parent.accounts[args.accountId]
  }
}
