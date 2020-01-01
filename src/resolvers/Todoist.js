const moment = require(`moment`)
const fetch = require(`node-fetch`)

const todoistUrl = process.env.TODOIST_URL

module.exports = {
  tasksToday: (parent, args, context, info) => {
    const { tasks } = parent
    const { projectName: desiredProject } = args

    return tasks.filter((task) => {
      if (!task.due || !task.due.date) return false

      if (moment(task.due.date) > moment().endOf(`day`)) return false

      if (desiredProject && task.projectName !== desiredProject) return false

      return true
    })
  },
  activity: async (parent, args, context, info) => {
    const { projectId} = args

    const query = projectId ? `?projectId=${projectId}` : ``
    const res = await fetch(`${todoistUrl}/api/activity${query}`, {
        method: `GET`,
        headers: context
      })

    let events = await res.json()

    const startOfDay = moment().startOf(`day`)
    return events.filter((event) => {
      return startOfDay < moment(event.event_date)
    })
  }
}
