import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc
} from 'firebase/firestore'

import { db } from './dbFirebase.jsx'

// Get all notes from Firestore
export const getAllNotesFirebase = async (userId) => {
  const notes = []
  const notesSnap = await getDocs(collection(db, `${userId}/journal/notes`))

  notesSnap.forEach(note => notes.push({ id: note.id, ...note.data() }))

  return notes
}

// Get a note by noteId from Firestore
export const getNoteFirebase = async (userId, noteId) => {
  const noteRef = await getDoc(doc(db, `${userId}/journal/notes`, `${noteId}`))
  const note = noteRef.data()

  return note
}

// Create new note and return the new note (Firestore)
export const createNotesFirebase = async (userId) => {
  const newNote = {
    title: '',
    body: '',
    date: new Date().getTime() // milliseconds
  }

  const docRef = await addDoc(collection(db, `${userId}/journal/notes`), newNote)

  return { id: docRef.id, ...newNote }
}

// Save note and return the updated note
export const saveNoteFirebase = async (userId, note) => {
  const noteToFirestore = {
    ...note,
    date: new Date().getTime()
  }

  delete noteToFirestore.id
  await updateDoc(doc(db, `${userId}/journal/notes`, `${note?.id}`), noteToFirestore)

  return noteToFirestore
}

// Delete one note y return the id of the deleted note
export const deleteNoteFirebase = async (userId, noteId) => {
  await deleteDoc(doc(db, `${userId}/journal/notes`, `${noteId}`))

  return noteId
}
