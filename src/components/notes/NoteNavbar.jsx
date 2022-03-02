import { useDispatch, useSelector } from 'react-redux'

import { startSaveNote, startUploading } from '../../actions/notes.jsx'

export const NoteNavbar = () => {
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
    <div className='notes-navbar'>
      <span> 02 de marzo 2022</span>

      <input
        id='fileSelector'
        name='file'
        style={{ display: 'none' }}
        type='file'
        onChange={handleFileChange}
      />

      <div>
        <button
          className='btn btn-picture'
          onClick={handlePictureCLick}
        >
          <i className='far fa-image fa-1x mt-1 pr-1' />
          <span>Picture</span>
        </button>

        <button
          className='btn btn-save'
          onClick={handleSave}
        >
          <i className='far fa-save fa-1x mt-1 pr-1' />
          <span>Save</span>
        </button>
      </div>
    </div>
  )
}
