function applyQueryToItems(items, query) {
  const { fields = '', page = 1, limit, ...filters } = query
  let count = items.length

  if (Object.keys(filters).length > 0) {
    items = searchItemsByFields(items, filters)
    count = items.length
  }

  if (fields) {
    items = mapItemsByFields(items, fields)
  }

  if (limit) {
    items = paginateItems(items, { page, limit })
  }

  return {
    items,
    count,
  }
}

function searchItemsByFields(items, fields) {
  const keys = Object.keys(fields)

  return items.filter((item) =>
    keys.every((key) =>
      item[key].toLowerCase().includes(fields[key].toLowerCase())
    )
  )
}

function mapItemsByFields(items, fields) {
  return items.map((item) =>
    fields
      .split(',')
      .reduce((obj, field) => ((obj[field] = item[field]), obj), {})
  )
}

function paginateItems(items, { page, limit }) {
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
