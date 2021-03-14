function applyQueryToItems(items, query) {
  if (!Array.isArray(items) || !query || typeof query !== 'object') {
    throw new Error('Invalid parameters to applyQueryToItems method')
  }

  const { fields, page, limit, ...filters } = query
  let newItems = [...items]

  newItems = searchItemsByFields(newItems, filters)
  const count = newItems.length

  newItems = mapItemsByFields(newItems, fields)
  newItems = paginateItems(newItems, { page, limit })

  return {
    items: newItems,
    count,
  }
}

function searchItemsByFields(items, fields) {
  if (!fields || typeof fields !== 'object' || Object.keys(fields).length === 0)
    return items

  const keys = Object.keys(fields)

  return items.filter((item) =>
    keys.every((key) =>
      item[key].toLowerCase().includes(fields[key].toLowerCase())
    )
  )
}

function mapItemsByFields(items, fields = '') {
  if (!fields || typeof fields !== 'string') return items

  const fieldsArray = fields.split(',')

  return items.map((item) =>
    fieldsArray.reduce((obj, field) => ((obj[field] = item[field]), obj), {})
  )
}

function paginateItems(items, { page = 1, limit }) {
  if (!limit) return items

  const startIndex = +limit * (page - 1)
  const endIndex = +limit + startIndex

  return items.slice(startIndex, endIndex)
}

module.exports = {
  searchItemsByFields,
  paginateItems,
  mapItemsByFields,
  applyQueryToItems,
}
