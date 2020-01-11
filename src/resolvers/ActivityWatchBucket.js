const moment = require(`moment`)
const fetch = require(`node-fetch`)

const awUrl = process.env.AW_URL

const buildQueryString = (query) => {
  const queryStrings = Object.keys(query).map((key) => {
    if (!query[key]) return ``

    return `${key}=${query[key]}`
  }).filter(Boolean)

  return queryStrings.join(`&`)
}

module.exports = {
  activity: async (parent, args, context, info) => {
    const { before = moment(), after = moment(`2019-01-01`) } = args
    const { id } = parent

    let windows = []
    let neededWindows = moment(before).diff(moment(after), `hours`) + 1

    // Create one hour windows to grab events
    // Otherwise we could exceed the lambda func's 6mb response limit
    do {
      // Grab the end of the previous window
      const startOfWindow = (windows.length !== 0 ? moment(windows.slice(-1)[0][1]) : moment(after)).add(1, `second`)
      let endOfWindow = moment(startOfWindow).add(1, `hour`)

      if (moment(before).isBefore(endOfWindow)) {
        endOfWindow = moment(before)
      }

      windows.push([ startOfWindow.format(), endOfWindow.format() ])
    } while (windows.length < neededWindows)

    const eventsPromises = windows.map(([ before, after ], index) => {
      // Offset the windows to not flood the server
      return new Promise((resolve) => {
        setTimeout(() => {
          // We need to flip the before and after from positive from negative
          // positive = time between two points
          // negative = all time outside of two points
          const queryString = buildQueryString({ before: after, after: before })

          return resolve(fetch(`${awUrl}/api/buckets/${id}/events?${queryString}`, {
            headers: context
          }))
        }, 1000 * index)
      })
    })

    let events = await Promise.all(eventsPromises)

    events = events.map((response) => {
      return response.json()
    })

    // Deconstruct the responses into a big array of events
    events = await Promise.all(events)
    events = events.map(({ data }) => data)
    events = [].concat(...events)

    return events
  },
}
