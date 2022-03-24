/**
 * @jest-environment node
 */

import * as fs from 'fs'

import { beforeEach, describe, expect, test, vi } from 'vitest'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { deleteNoteFirebase, getNoteFirebase } from '../../firebase/notesFirebase.jsx'
import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes.jsx'
import { types } from '../../types/types.jsx'

// fileUpload returns with a mock (fake) image url
vi.mock('../../helpers/fileUpload.jsx', () => ({
  fileUpload: vi.fn(() => {
    return Promise.resolve('https://hello-world.com/photo.jpg')
  })
}))

global.scrollTo = vi.fn()

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {
  auth: { uid: 'TESTING' },
  notes: {
    active: {
      id: 'AmsWVHJ2PoJa4oMCaBRe',
      date: 1647575557147,
      title: 'Hello',
      body: 'world'
    }
  }
}
let store = mockStore(initState) // mock store

describe('Tests actions Notes', () => {
  beforeEach(() => {
    store = mockStore(initState)
  })

  const currentDay = new Date().getTime()

  test('should load all notes', async () => {
    const userID = 'TESTING'

    await store.dispatch(startLoadingNotes(userID))
    const actions = store.getActions()

    // Return an array, because there is a test startSaveNote, line 98
    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array) // get all notes
    })

    const expected = {
      id: expect.any(String),
      date: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String)
    }

    expect(actions[0].payload[0]).toMatchObject(expected)
  })

  test('should start new note and then delete note', async () => {
    await store.dispatch(startNewNote())
    const actions = store.getActions()

    // Add new note to Firebase
    expect(actions[0]).toEqual({
      type: types.notesAddNew,
      payload: {
        id: expect.any(String),
        date: expect.any(Number),
        title: '',
        body: ''
      }
    })

    // Activate new note
    expect(actions[1]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        date: expect.any(Number),
        title: '',
        body: ''
      }
    })

    // get noteID from Firebase
    const noteID = actions[0].payload.id

    // delete note from Firebase
    await deleteNoteFirebase(initState.auth.uid, noteID)
  })

  test('should refresh note, fields save or update', async () => {
    const note = {
      id: 'JX2J6MUWfaSU8ZTaXRSb', // noteID from Firebase
      date: currentDay,
      title: 'updated title',
      body: 'updated body'
    }

    await store.dispatch(startSaveNote(note))
    const actions = store.getActions()

    expect(actions[0].type).toBe(types.notesUpdated)

    // get note from Firebase by noteID
    const updatedNote = await getNoteFirebase(initState.auth.uid, note.id)

    expect(updatedNote.title).toBe(note.title)
  })

  test('startUploading should update the url of the entry, in firebase', async () => {
    // Write a file to the temp directory
    fs.writeFileSync('photo.jpg', '')

    // Read file from the temp directory
    const file = fs.readFileSync('photo.jpg')

    // Upload file to Firebase
    await store.dispatch(startUploading(file))
    const { auth, notes } = initState
    const docRef = await getNoteFirebase(auth.uid, notes.active.id)

    expect(docRef.url).toBe('https://hello-world.com/photo.jpg')
  })
})
