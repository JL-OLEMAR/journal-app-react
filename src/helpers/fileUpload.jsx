export const fileUpload = async (file) => {
  const cloudUrl = 'https://api.cloudinary.com/v1_1/olemar/upload'

  const formData = new window.FormData()

  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)

  try {
    const resp = await window.fetch(cloudUrl, {
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
