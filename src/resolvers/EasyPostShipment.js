
module.exports = {
  trackingCode: (parent) => {

    return parent.tracking_code
  },

  estimatedDelivery: (parent) => {

    return parent.est_delivery_date
  },

  trackingDetails: (parent) => {

    return parent.tracking_details
  },

  updatedAt: (parent) => {

    return parent.updated_at
  },

  createdAt: (parent) => {

    return parent.created_at
  },
}

