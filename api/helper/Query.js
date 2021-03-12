function applyQueryToItems(items, query) {
  const { fields = '', page = 1, limit, ...filters } = query

  if (Object.keys(filters).length > 0) {
    items = searchItemsByFields(items, filters)
  }

  if (fields) {
    items = mapItemsByFields(items, fields)
  }

  if (limit) {
    items = paginateItems(items, { page, limit })
  }

  return items
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
  return items.map((p) =>
    fields.split(',').reduce((a, c) => ((a[c] = p[c]), a), {})
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
