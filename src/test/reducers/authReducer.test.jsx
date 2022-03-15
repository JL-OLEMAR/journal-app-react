import { describe, expect, test } from 'vitest'

import { authReducer } from '../../reducers/authReducer.jsx'
import { types } from '../../types/types.jsx'

describe('authReducer', () => {
  test('must login', () => {
    const initState = {}
    const action = {
      type: types.login,
      payload: {
        uid: '123',
        displayName: 'Jhon Doe'
      }
    }

    const state = authReducer(initState, action)

    expect(state).toEqual({
      uid: '123',
      name: 'Jhon Doe'
    })
  })

  test('must logout', () => {
    const initState = {
      uid: '123',
      name: 'Jhon Doe'
    }

    const action = {
      type: types.logout
    }

    const state = authReducer(initState, action)

    expect(state).toEqual({})
  })

  test('shouldn\'t make any action', () => {
    const initState = {
      uid: '123',
      name: 'Jhon Doe'
    }

    const action = {
      type: 'ksdfkasdjfsldf'
    }

    const state = authReducer(initState, action)

    expect(state).toEqual(initState)
  })
})
