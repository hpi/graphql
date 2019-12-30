module.exports = {
  projectId: (parent, args, context, info) => {
    return parent.project_id
  },
  sectionId: (parent, args, context, info) => {
    return parent.section_id
  },
  labelIds: (parent, args, context, info) => {
    return parent.label_ids
  },
  commentCount: (parent, args, context, info) => {
    return parent.comment_count
  },
  due: (parent) => {
    return parent.due && (parent.due.datetime || parent.due.date) || null
  }
}
