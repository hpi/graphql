const moment = require(`moment`)
const fetch = require(`node-fetch`)

const todoistUrl = process.env.TODOIST_URL

module.exports = {
  tasksToday: async (parent, args, context, info) => {
    const { id } = parent

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

    const res = await fetch(`${todoistUrl}/api/activity?projectId=${id}`, {
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
