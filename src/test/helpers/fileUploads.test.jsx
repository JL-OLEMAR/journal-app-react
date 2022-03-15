import fetch, { File } from 'node-fetch'
import cloudinary from 'cloudinary'
import { describe, expect, test } from 'vitest'

import { fileUpload } from '../../helpers/fileUpload.jsx'

cloudinary.config({
  cloud_name: import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.VITE_APP_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.VITE_APP_CLOUDINARY_API_SECRET,
  secure: true
})

describe.skip('Test fileUpload', () => {
  test('should upload a file and return the url, then delete imagen', async (done) => {
    const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png')
    const blob = await resp.blob()
    const file = new File([blob], 'foto.png')
    const url = await fileUpload(file, 'foto.png')

    expect(typeof url).toBe('string')

    // Delete image by ID
    const segments = url.split('/')
    const imageId = segments[segments.length - 1].replace('.png', '')

    cloudinary.v2.api.delete_resources(imageId, {}, () => { done() })
  })

  test('should return a error', async () => {
    const file = new File([], 'foto.png')
    const url = await fileUpload(file)

    expect(url).toBe(null)
  })
})
