import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useForm } from '../../hooks/useForm.jsx'
import { activeNote, startDeleting } from '../../actions/notes.jsx'

import { NotesAppBar } from './NotesAppBar.jsx'

export const NoteScreen = () => {
  const dispatch = useDispatch()
  const { active: note } = useSelector((state) => state.notes)
  const [formValues, handleInputChange, reset] = useForm(note)
  const { body, title, id } = formValues
  const activeId = useRef(note.id)

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note)
      activeId.current = note.id
    }
  }, [note, reset])

  useEffect(() => {
    dispatch(activeNote(formValues.id, { ...formValues }))
  }, [dispatch, formValues])

  const handleDelete = () => {
    dispatch(startDeleting(id))
  }

  return (
    <div className='notes__main-content'>
      <NotesAppBar />

      <div className='notes__content'>
        <input
          autoComplete='off'
          className='notes__title-input'
          name='title'
          placeholder='Some awesome title'
          type='text'
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          className='notes__textarea'
          name='body'
          placeholder='What happend today'
          value={body}
          onChange={handleInputChange}
        />

        {note.url && (
          <div className='notes__image'>
            <img alt={note.title} src={note.url} />
          </div>
        )}
      </div>

      <button className='btn btn-danger' onClick={handleDelete}>
        Delete
      </button>
    </div>
  )
}
