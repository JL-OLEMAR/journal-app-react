import { collection, deleteDoc, addDoc, updateDoc, doc } from 'firebase/firestore'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'

import { db } from '../firebase/firebase-config.jsx'
import { fileUpload } from '../helpers/fileUpload.jsx'
import { loadNotes } from '../helpers/loadNotes.jsx'
import { types } from '../types/types.jsx'

// Saved notes
export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    try {
      const doc = await addDoc(collection(db, `${uid}/journal/notes`), newNote)

      dispatch(activeNote(doc.id, newNote))
      dispatch(addNewNote(doc.id, newNote))
    } catch (error) {
      console.log(error)
    }
  }
}

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: { id, ...note }
})

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: { id, ...note }
})

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    try {
      const notes = await loadNotes(uid)

      dispatch(setNotes(notes))
    } catch (error) {
      console.log(error)
    }
  }
}

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
})

// Update
export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    if (!note.url) {
      delete note.url
    }

    try {
      // const noteToFirestore = { ...note }
      const noteToFirestore = {
        ...note,
        date: new Date().getTime()
      }

      delete noteToFirestore.id
      await updateDoc(doc(db, `${uid}/journal/notes`, `${note.id}`), noteToFirestore)

      dispatch(refreshNote(note.id, noteToFirestore))
      Swal.fire('Note Saved', note.title, 'success')
    } catch (error) {
      console.log(error)
    }
  }
}

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: { id, ...note }
  }
})

export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes

    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    })

    const fileUrl = await fileUpload(file)

    activeNote.url = fileUrl
    dispatch(startSaveNote(activeNote))
    Swal.close()
  }
}

// Delete
export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    try {
      const { uid, name } = getState().auth

      await deleteDoc(doc(db, `${uid}/journal/notes`, `${id}`))
      Swal.fire({
        title: `${name}, Are you sure?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your note has been deleted.',
            'success'
          )
          dispatch(deleteNote(id))
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id
})

export const noteLogout = () => ({
  type: types.notesLogoutCleaning
})
