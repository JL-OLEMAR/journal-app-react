export const fileUpload = async (file) => {
  // Upload images to server the cloudinary
  const cloudUrl = `${import.meta.env.VITE_APP_CLOUDINARY_URL}/upload`
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
