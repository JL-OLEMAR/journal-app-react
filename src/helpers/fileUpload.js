export const fileUpload = async (file) => {
  const cloudUrl = 'https://api.cloudinary.com/v1_1/olemar/upload'

  const formData = new FormData() // eslint-disable-line 
  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)

  try { /* eslint-disable-line */
    const resp = await fetch(cloudUrl, { // eslint-disable-line 
      method: 'POST',
      body: formData
    })

    if (resp.ok) {
      const cloudResp = await resp.json()
      return cloudResp.secure_url
    } else {
      throw await resp.json()
    }
  } catch (err) {
    throw err
  }
}
