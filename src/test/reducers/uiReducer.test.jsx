import { uiReducer } from '../../reducers/uiReducer.jsx'
import { types } from '../../types/types.jsx'

describe('uiReducer', () => {
  test('should set error in UI', () => {
    const initState = {
      loading: false,
      msgError: null
    }

    const action = {
      type: types.uiSetError,
      payload: Error('Error')
    }

    const state = uiReducer(initState, action)

    expect(state).toEqual({
      loading: false,
      msgError: Error('Error')
    })
  })

  test('should remover error in UI', () => {
    const initState = {
      loading: false,
      msgError: Error('Error')
    }

    const action = {
      type: types.uiRemoveError,
      payload: null
    }

    const state = uiReducer(initState, action)

    expect(state).toEqual({
      loading: false,
      msgError: null
    })
  })

  test('should start loading in UI', () => {
    const initState = {
      loading: false,
      msgError: null
    }

    const action = {
      type: types.uiStartLoading,
      payload: true
    }

    const state = uiReducer(initState, action)

    expect(state).toEqual({
      loading: true,
      msgError: null
    })
  })

  test('should finish loading in UI', () => {
    const initState = {
      loading: true,
      msgError: null
    }

    const action = {
      type: types.uiFinishLoading,
      payload: false
    }

    const state = uiReducer(initState, action)

    expect(state).toEqual({
      loading: false,
      msgError: null
    })
  })

  test('return the same state', () => {
    const initState = {
      loading: false,
      msgError: null
    }

    const action = {}
    const state = uiReducer(initState, action)

    expect(state).toEqual(initState)
  })
})
