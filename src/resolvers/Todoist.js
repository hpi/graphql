const moment = require(`moment`)

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
  }
}
