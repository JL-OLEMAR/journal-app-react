import { describe, expect, test } from 'vitest'

import { notesReducer } from '../../reducers/notesReducer.jsx'
import { types } from '../../types/types.jsx'

describe('notesReducer', () => {
  const currentDay = new Date().getTime()

  test('should show the active note', () => {
    const initState = {
      notes: [],
      active: null
    }

    const action = {
      type: types.notesActive,
      payload: {
        id: '123',
        title: '',
        body: '',
        date: currentDay
      }
    }

    const state = notesReducer(initState, action)

    expect(state).toEqual({
      notes: [],
      active: {
        id: '123',
        title: '',
        body: '',
        date: currentDay
      }
    })
  })

  test('should add new note', () => {
    const initState = {
      notes: [],
      active: null
    }

    const action = {
      type: types.notesAddNew,
      payload: {
        id: '123',
        title: '',
        body: '',
        date: currentDay
      }
    }

    const state = notesReducer(initState, action)

    expect(state).toEqual({
      notes: [{
        id: '123',
        title: '',
        body: '',
        date: currentDay
      }],
      active: null
    })
  })

  test('should load all notes', () => {
    const initState = {
      notes: [
        {
          id: '123',
          title: 'title',
          body: 'body',
          date: currentDay
        }
      ],
      active: null
    }

    const action = {
      type: types.notesLoad,
      payload: [
        {
          id: '123',
          title: 'title',
          body: 'body',
          date: currentDay
        }
      ]
    }

    const state = notesReducer(initState, action)

    expect(state).toEqual({
      notes: [
        {
          id: '123',
          title: 'title',
          body: 'body',
          date: currentDay
        }
      ],
      active: null
    })
  })

  test('should update note', () => {
    const arrayNotes = [
      {
        id: '123',
        title: ''
      },
      {
        id: '456',
        title: ''
      }
    ]

    const initState = {
      notes: arrayNotes,
      active: {
        id: '123',
        title: ''
      }
    }

    // return all notes with updated note
    const resp = arrayNotes.map(n => (
      (n.id === '123') // Update note if the id is '123'
        ? {
            id: n.id,
            note: {
              id: n.id,
              title: 'title',
              body: 'body',
              date: currentDay,
              url: ''
            }
          }
        : n
    ))

    // filter out the note with id '123'
    const [filterNote] = resp.filter(n => n.id === '123')

    const action = {
      type: types.notesUpdated,
      payload: filterNote
    }

    const state = notesReducer(initState, action)

    expect(state).toEqual({
      notes: [
        {
          id: '123',
          title: 'title',
          body: 'body',
          date: currentDay,
          url: ''
        },
        {
          id: '456',
          title: ''
        }
      ],
      active: {
        id: '123',
        title: ''
      }
    })
  })

  test('should delete note', () => {
    const arrayNotes = [
      {
        id: '123',
        title: ''
      },
      {
        id: '133',
        title: ''
      },
      {
        id: '456',
        title: ''
      }
    ]

    const initActive = {
      id: '123',
      title: ''
    }

    const initState = {
      notes: arrayNotes,
      active: initActive
    }

    const noteId = '123'

    arrayNotes.filter(n => n.id !== noteId)
    initActive === null // eslint-disable-line

    const action = {
      type: types.notesDelete,
      payload: noteId
    }

    const state = notesReducer(initState, action)

    expect(state).toEqual({
      notes: [
        {
          id: '133',
          title: ''
        },
        {
          id: '456',
          title: ''
        }
      ],
      active: null
    })
  })

  test('should cleaning notes logout', () => {
    const arrayNotes = [
      {
        id: '123',
        title: ''
      },
      {
        id: '133',
        title: ''
      },
      {
        id: '456',
        title: ''
      }
    ]

    const initActive = {
      id: '123',
      title: ''
    }

    const initState = {
      notes: arrayNotes,
      active: initActive
    }

    arrayNotes.length === 0 // eslint-disable-line
    initActive === null // eslint-disable-line

    const action = {
      type: types.notesLogoutCleaning
    }

    const state = notesReducer(initState, action)

    expect(state).toEqual({
      notes: [],
      active: null
    })
  })

  test('return the same state', () => {
    const initState = {
      notes: [
        {
          id: '123',
          title: ''
        },
        {
          id: '133',
          title: ''
        },
        {
          id: '456',
          title: ''
        }
      ],
      active: {
        id: '123',
        title: ''
      }
    }

    const action = {}
    const state = notesReducer(initState, action)

    expect(state).toEqual(initState)
  })
})
