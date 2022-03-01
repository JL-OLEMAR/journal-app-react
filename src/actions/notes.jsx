import { collection, deleteDoc, addDoc, updateDoc, doc } from 'firebase/firestore'
import Swal from 'sweetalert2'

import { db } from '../firebase/firebase-config.jsx'
import { fileUpload } from '../helpers/fileUpload.jsx'
import { loadNotes } from '../helpers/loadNotes.jsx'
import { types } from '../types/types.jsx'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    try {
      // const doc = await db.collection(`${uid}/journal/notes`).add(newNote)
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
      const noteToFirestore = { ...note }

      delete noteToFirestore.id

      // await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore)
      await updateDoc(doc(db, `${uid}/journal/notes`, `${note.id}`), noteToFirestore)

      dispatch(refreshNote(note.id, noteToFirestore))
      Swal.fire('Saved', note.title, 'success')
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
      onBeforeOpen: () => {
        Swal.showLoading()
      }
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
      const uid = getState().auth.uid

      // await db.doc(`${uid}/journal/notes/${id}`).delete()
      await deleteDoc(doc(db, `${uid}/journal/notes`, `${id}`))

      dispatch(deleteNote(id))
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
