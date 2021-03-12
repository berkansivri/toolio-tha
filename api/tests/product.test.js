const request = require('supertest')
const app = require('../app')

describe('product test', () => {
  test('should get products', async () => {
    const response = await request(app).get('/products').send().expect(200)
    const { items, count } = response.body

    expect(items).toEqual(expect.any(Array))
    expect(count).toEqual(expect.any(Number))
  })

  test('should get products with fields', async () => {
    const fields = 'id,title'
    const response = await request(app)
      .get('/products')
      .query({ fields })
      .send()
      .expect(200)

    expect(response.body.items).toEqual(expect.any(Object))
    expect(Object.keys(response.body.items[0]).join(',')).toEqual(fields)
  })

  test('should get products with filter', async () => {
    const title = 'car'
    const response = await request(app)
      .get('/products')
      .query({ title })
      .send()
      .expect(200)

    const { items, count } = response.body
    expect(count).toEqual(expect.any(Number))
    expect(items.every((x) => x.title.toLowerCase().includes(title))).toBe(true)
  })

  test('should get products with pagination', async () => {
    const query = { limit: 10, page: 1 }
    const response = await request(app)
      .get('/products')
      .query(query)
      .send()
      .expect(200)

    const { items, count } = response.body
    expect(count).toEqual(expect.any(Number))
    expect(items).toEqual(expect.any(Array))
    expect(items.length).toEqual(10)
  })

  test('should get products with all queries', async () => {
    const query = { title: 'CAR', fields: 'id,title', limit: 20, page: 2 }
    const response = await request(app)
      .get('/products')
      .query(query)
      .send()
      .expect(200)

    const { items, count } = response.body
    expect(Object.keys(items[0]).join(',')).toEqual(query.fields)
    expect(count).toEqual(expect.any(Number))

    expect(
      items.every((x) =>
        x.title.toLowerCase().includes(query.title.toLowerCase())
      )
    ).toBe(true)
  })
})
