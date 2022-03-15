import fetch, { FormData } from 'node-fetch'

export const fileUpload = async (file) => {
  // Url of the uploaded file
  const cloudUrl = `${import.meta.env.VITE_APP_CLOUDINARY_URL}/upload`
  // Form data
  const formData = new FormData()

  // "react-journal-firebase" is the name of the upload_preset in Cloudinary
  formData.append('upload_preset', 'react-journal-firebase')
  formData.append('file', file)

  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    })

    if (resp.ok) {
      const cloudResp = await resp.json()

      return cloudResp.secure_url
    } else {
      return null
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}
