/**
 * @jest-environment node
 */

import * as fs from 'fs'

import cloudinary from 'cloudinary'
import { describe, expect, test, vi } from 'vitest'

import { fileUpload } from '../../helpers/fileUpload.jsx'

// fileUpload returns with a mock (fake) image url
vi.mock('../../helpers/fileUpload.jsx', () => ({
  fileUpload: vi.fn(() => {
    return Promise.resolve('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png')
  })
}))

cloudinary.config({
  cloud_name: import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.VITE_APP_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.VITE_APP_CLOUDINARY_API_SECRET,
  secure: true
})

describe('Test fileUpload', () => {
  test('should upload a file and return the url, then delete image', async (done) => {
    // Write a file to the temp directory
    fs.writeFileSync('test.png', '')

    // Read file from the temp directory
    const file = fs.readFileSync('test.png')

    // Upload image mock and return the url
    const url = await fileUpload(file)

    expect(typeof url).toBe('string')

    // Delete image mock of cloudinary (fake)
    const segments = url.split('/')
    const imageId = segments[segments.length - 1].replace('.png', '')

    cloudinary.v2.api.delete_resources(imageId, {}, () => { done() })
  })

  test('should return a error', async () => {
    // fileUpload mock error
    fileUpload.mockReturnValue(null)

    // Write a file to the temp directory
    fs.writeFileSync('test1.png', '')

    // Read file from the temp directory
    const file = fs.readFileSync('test1.png')

    // Upload image mock with null
    const url = await fileUpload(file)

    expect(url).toBe(null)
  })
})
