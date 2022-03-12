import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'

import { types } from '../types/types.jsx'
import { fileUpload } from '../helpers/fileUpload.jsx'
import {
  loadNotesFirebase,
  createNotesFirebase,
  saveNoteFirebase,
  deleteNoteFirebase
} from '../firebase/notesFirebase.jsx'

// Load all notes
export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
})

// Load all notes (Firebase)
export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    try {
      const notes = await loadNotesFirebase(uid) // (Firebase)

      // sort notes by date desc
      const orderedNotes = notes.sort((a, b) => b.date - a.date)

      dispatch(setNotes(orderedNotes))
    } catch (error) {
      console.log(error)
    }
  }
}

// Note active (selected)
export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: { id, ...note }
})

// Add new note (Firestore)
export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: { id, date: new Date().getTime(), ...note }
})

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    try {
      const docRef = await createNotesFirebase(uid) // (Firebase)

      dispatch(addNewNote(docRef.id, docRef))
      dispatch(activeNote(docRef.id, docRef))
    } catch (error) {
      console.log(error)
    }
  }
}

// Reload a note with your fields save or updated
export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: { id, note: { id, date: new Date().getTime(), ...note } }
})

// Save or update a note to Firebase
export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth

    !note.url && delete note.url

    try {
      const noteSaved = await saveNoteFirebase(uid, note) // (Firebase)

      dispatch(refreshNote(note.id, noteSaved))
      Swal.fire('Note Saved', note.title, 'success')
    } catch (error) {
      console.log(error)
    }
  }
}

// Upload image (Cloudinary) and save note (Firebase)
export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes

    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading()
    })

    const fileUrl = await fileUpload(file) // (Cloudinary)

    // Set the name of the url to the selected note
    activeNote.url = fileUrl
    dispatch(startSaveNote(activeNote))
    Swal.close()
  }
}

// Delete note
export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id
})

// Delete note Firebase
export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    try {
      const { uid, name } = getState().auth

      Swal.fire({
        title: `${name}, Are you sure?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const noteDeleted = await deleteNoteFirebase(uid, id) // (Firebase)

          dispatch(deleteNote(noteDeleted))

          Swal.fire(
            'Deleted!',
            'Your note has been deleted.',
            'success'
          )
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}

// Clear note
export const noteLogout = () => ({
  type: types.notesLogoutCleaning
})
