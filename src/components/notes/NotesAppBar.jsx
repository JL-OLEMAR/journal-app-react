import { useDispatch, useSelector } from 'react-redux'

import { startSaveNote, startUploading } from '../../actions/notes.jsx'

export const NotesAppBar = () => {
  const dispatch = useDispatch()
  const { active } = useSelector(state => state.notes)

  const handleSave = () => {
    dispatch(startSaveNote(active))
  }

  const handlePictureCLick = () => {
    document.querySelector('#fileSelector').click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      dispatch(startUploading(file))
    }
  }

  return (
    <div className='notes-appbar'>
      <span> 28 de agosto 2021</span>

      <input
        id='fileSelector'
        name='file'
        style={{ display: 'none' }}
        type='file'
        onChange={handleFileChange}
      />

      <div>
        <button
          className='btn'
          onClick={handlePictureCLick}
        >
          Picture
        </button>

        <button
          className='btn'
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  )
}
