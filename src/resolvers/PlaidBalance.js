module.exports = {
  isoCurrencyCode: (parent) => {
    return parent.iso_currency_code
  },
  unofficialCurrencyCode: (parent) => {
    return parent.unofficial_currency_code
  }
}
