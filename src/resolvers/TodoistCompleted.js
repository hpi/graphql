module.exports = {
  metadata: (parent, args, context, info) => {
    return parent.meta_data
  },
  userId: (parent, args, context, info) => {
    return parent.user_id
  },
  taskId: (parent, args, context, info) => {
    return parent.task_id
  },
  projectId: (parent, args, context, info) => {
    return parent.meta_data
  },
  completedDate: (parent, args, context, info) => {
    return parent.completed_date
  }
}
