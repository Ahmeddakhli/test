import fs from 'fs'
import path from 'path'
import app from '../index'
import supertest from 'supertest'

const request = supertest(app)
describe('test main response', () => {
  it('To verify express app is working or not', async () => {
    const response = await request.get('/api')
    expect(response.status).toBe(200)
  })
})

//It should return 404  when there is no file'
it('It should return 404  when there is no file', async () => {
  const fileName = 'fjor'
  const response = await request.get(
    `/api/image_api?filename=${fileName}&width=200&height=200`
  )
  expect(response.status).toBe(404)
  expect(response.text).toBe(`${fileName} does not exist .check the file name`)
})
//Test image api
describe('Test image api', () => {
  it('It should return 500 status ', async () => {
    const response = await request.get('/api/image_api')
    expect(response.status).toBe(500)
    expect(response.text).toBe(
      'img_file_name, img_width and img_height are mandatory . Please hit the api again'
    )
  })

  //It should resize the image
  it('It should resize the image', async () => {
    await request.get('/api/image_api?filename=fjord&width=200&height=200')
    const filePath = path.join(
      __dirname,
      '../../public/resizedimages',
      'fjord-200-200-thumb.jpg'
    )
    expect(fs.existsSync(filePath)).toBeTrue()
  })
})
