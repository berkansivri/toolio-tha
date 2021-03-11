const request = require('supertest')
const app = require('../app')

describe('product test', () => {
  test('should get products', async () => {
    const response = await request(app).get('/products').send().expect(200)
    expect(response.body).toEqual(expect.any(Array))
  })

  test('should get products with fields', async () => {
    const fields = ['id', 'title']
    const response = await request(app)
      .get('/products')
      .query({ fields })
      .send()
      .expect(200)

    expect(response.body).toEqual(expect.any(Array))

    expect(Object.keys(response.body[0])).toEqual(fields)
  })

  test('should get products with filter', async () => {
    const title = 'car'
    const response = await request(app)
      .get('/products')
      .query({ title })
      .send()
      .expect(200)

    expect(
      response.body.every((x) => x.title.toLowerCase().includes(title))
    ).toBe(true)
  })

  test('should get products with both fields and filter', async () => {
    const query = { title: 'car', fields: ['id', 'title'] }
    const response = await request(app)
      .get('/products')
      .query(query)
      .send()
      .expect(200)

    expect(Object.keys(response.body[0])).toEqual(query.fields)

    expect(
      response.body.every((x) => x.title.toLowerCase().includes(query.title))
    ).toBe(true)
  })
})
