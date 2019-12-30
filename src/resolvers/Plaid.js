const fetch = require('node-fetch')

module.exports = {
  transactions: (parent, args, context, info) => {
    return args.accountId ? parent._transactions[args.accountId] : parent._transactions
  },
  account: (parent, args, context, info) => {
    return parent._accounts[args.accountId]
  }
}
