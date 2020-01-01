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
    const { extra_data: { dueDate: due_date, lastDueDate: last_due_date } } = parent

    return dueDate && lastDueDate && dueDate !== lastDueDate
  },

}
