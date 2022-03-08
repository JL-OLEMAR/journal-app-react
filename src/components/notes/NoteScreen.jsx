import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useForm } from '../../hooks/useForm.jsx'
import { activeNote, startDeleting } from '../../actions/notes.jsx'

import { NoteNavbar } from './NoteNavbar.jsx'
import './NoteScreen.css'

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
    <div className='notes-main-content'>
      <NoteNavbar />

      <div className='notes-content' id='note'>
        <input
          autoFocus
          autoComplete='off'
          className='input title-input'
          name='title'
          placeholder='Entry Title'
          type='text'
          value={title}
          onChange={handleInputChange}
        />

        <textarea
          className='input text-area'
          name='body'
          placeholder='Your entry here...'
          value={body}
          onChange={handleInputChange}
        />

        {note.url && (
          <div className='notes-image'>
            <img alt={note.title} src={note.url} />
          </div>
        )}
      </div>

      <button
        className='btn btn-danger btn-del '
        onClick={handleDelete}
      >
        <i className='fa fa-trash fa-1x mt-1 pr-1' />
        <span>Delete</span>
      </button>
    </div>
  )
}
