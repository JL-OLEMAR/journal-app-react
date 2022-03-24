import { beforeEach, describe, expect, test, vi } from 'vitest'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth.jsx'
import { types } from '../../types/types.jsx'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {}
let store = mockStore(initState) // mock store

describe('Tests actions Notes ', () => {
  beforeEach(() => {
    store = mockStore(initState)
    vi.clearAllMocks()
  })

  test('login and logout should create the respective action', () => {
    const uid = 'ABC123'
    const displayName = 'John Doe'

    const loginAction = login(uid, displayName)
    const logoutAction = logout()

    expect(loginAction).toEqual({
      type: types.login,
      payload: { uid, displayName }
    })

    expect(logoutAction).toEqual({
      type: types.logout
    })
  })

  test('should startLogout', async () => {
    await store.dispatch(startLogout())
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.logout
    })

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning
    })
  })

  test('should startLoginEmailPassword', async () => {
    // test1@test.com', '123456' from authentication firebase
    await store.dispatch(startLoginEmailPassword('test1@test.com', '123456'))
    const actions = store.getActions()

    // with the user created manually in firebase, test the login
    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: 'hip1HBxiI8dGtDSbwKr5NZTiiC32', // userUID from authentication firebase
        displayName: null
      }
    })
  })
})
