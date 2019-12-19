module.exports = {
  accountId: (parent) => {
    return parent.account_id
  },
  accountOwner: (parent) => {
    return parent.account_owner
  },
  categoryId: (parent) => {
    return parent.category_id
  },
  isoCurrencyCode: (parent) => {
    return parent.iso_currency_code
  },
  paymentMeta: (parent) => {
    return parent.payment_meta
  },
  pendingTransactionId: (parent) => {
    return parent.pending_transaction_id
  },
  transactionId: (parent) => {
    return parent.transaction_id
  },
  transactionType: (parent) => {
    return parent.transaction_type
  },
  unofficialCurrencyCode: (parent) => {
    return parent.unofficial_currency_code
  }
}
