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

    do {
      const startOfWindow = (windows.length !== 0 ? moment(windows.slice(-1)[0][1]) : moment(after)).add(1, `second`)
      let endOfWindow = moment(startOfWindow).add(1, `hour`)

      if (moment(before).isBefore(endOfWindow)) {
        endOfWindow = moment(before)
      }

      windows.push([ startOfWindow.format(), endOfWindow.format() ])
    } while (windows.length < neededWindows)

    const eventsPromises = windows.map(([ before, after ], index) => {
      return new Promise((resolve) => {
        setTimeout(() => {
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

    events = await Promise.all(events)
    events = events.map(({ data }) => data)
    events = [].concat(...events)

    if (id.includes(`-window_`)) {
      events = events.filter(({ data: { app } }) => {
        return app !== `Firefox`
      })
    }

    return events
  },
}
