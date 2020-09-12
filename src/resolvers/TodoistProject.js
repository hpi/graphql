const moment = require(`moment`)
const debug = require(`debug`)(`qnzl:watchers:graph:todoist-project`)
const fetch = require(`node-fetch`)

const todoistUrl = process.env.TODOIST_URL

const queryVariables = (query) => {
  const queryItems = Object.keys(query).map((key) => {
    if (!query[key]) return null

    return `${key}=${query[key]}`
  }).filter(Boolean)

  return `?${queryItems.join(`&`)}`
}

module.exports = {
  tasksToday: async (parent, args, context, info) => {
    const { id } = parent

    debug(`getting tasks today for ${id}`)

    const res = await fetch(`${todoistUrl}/api/tasks/${id}`, {
        method: `GET`,
        headers: context
      })

    let { tasks } = await res.json()

    return tasks.filter((task) => {
      if (!task.due || !task.due.date) return false

      if (moment(task.due.date) > moment().endOf(`day`)) return false

      return true
    })
  },
  activity: async (parent, args, context, info) => {
    const { id } = parent

    const url = projectId ? `${todoistUrl}/api/projects/${projectId}/activity` : `${todoistUrl}/api/projects/activity`

    debug(`getting activity from ${url}`)

    const res = await fetch(url, {
        method: `GET`,
        headers: context
      })

    let events = await res.json()

    debug(`got events, filtering to today`)
    const startOfDay = moment().startOf(`day`)
    return events.filter((event) => {
      return startOfDay < moment(event.event_date)
    })
  },
  completed: async (parent, args, context, info) => {
    const { projectId, since, until } = args

    const query = queryVariables({ since, until })

    const url = projectId ? `${todoistUrl}/api/projects/${projectId}/completed` : `${todoistUrl}/api/completed`

    debug(`getting completed from ${url}`)
    const res = await fetch(`${url}${query}`, {
        method: `GET`,
        headers: context
      })

    let events = await res.json()

    debug(`got completed events for ${projectId}`)

    return events
  },

}
