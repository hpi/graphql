const debug = require(`debug`)(`qnzl:watchers:graph:todoist-activity`)
const fetch = require(`node-fetch`)

const todoistUrl = process.env.TODOIST_URL

module.exports = {
  parentProjectId: (parent, args, context, info) => {
    return parent.parent_project_id
  },
  eventType: (parent, args, context, info) => {
    return parent.event_type
  },
  objectType: (parent, args, context, info) => {
    return parent.object_type
  },
  objectId: (parent, args, context, info) => {
    return parent.object_id
  },
  initiatorId: (parent, args, context, info) => {
    return parent.initiator_id
  },
  parentItemId: (parent, args, context, info) => {
    return parent.parent_item_id
  },
  eventDate: (parent, args, context, info) => {
    return parent.event_date
  },
  content: (parent, args, context, info) => {
    return parent.extra_data.content
  },
  hasBeenRescheduled: (parent, args, context, info) => {
    const { extra_data: { due_date: dueDate, last_due_date: lastDueDate } } = parent

    return dueDate && lastDueDate && dueDate !== lastDueDate
  },
  comments: async (parent, args, context) => {
    debug(`getting comments for task ${parent.object_id}`)

    const res = await fetch(`${todoistUrl}/api/task/${parent.object_id}/comments`, {
      method: `GET`,
      headers: context
    })

    const { comments } = await res.json()

    debug(`got ${comments.length} for ${parent.object_id}`)

    return comments
  }

}
