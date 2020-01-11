const moment = require(`moment`)
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
  tasksToday: (parent, args, context, info) => {
    const { tasks } = parent
    const { projectId: desiredProject } = args

    return tasks.filter((task) => {
      if (!task.due || !task.due.date) return false

      if (moment(task.due.date) > moment().endOf(`day`)) return false

      if (desiredProject && String(task.project_id) !== String(desiredProject)) return false

      return true
    })
  },
  activity: async (parent, args, context, info) => {
    const { projectId } = args

    const url = projectId ? `${todoistUrl}/api/projects/${projectId}/activity` : `${todoistUrl}/api/projects/activity`
    const res = await fetch(url, {
        method: `GET`,
        headers: context
      })

    let events = await res.json()

    const startOfDay = moment().startOf(`day`)
    return events.filter((event) => {
      return startOfDay < moment(event.event_date)
    })
  },
  completed: async (parent, args, context, info) => {
    const { projectId, since, until } = args

    const query = queryVariables({ since, until })

    const url = projectId ? `${todoistUrl}/api/projects/${projectId}/completed` : `${todoistUrl}/api/completed`
    const res = await fetch(`${url}${query}`, {
        method: `GET`,
        headers: context
      })

    let events = await res.json()

    return events
  },

}
