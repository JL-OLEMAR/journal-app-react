import { describe, expect, test } from 'vitest'

import { removeError, setError, uiFinishLoading, uiStartLoading } from '../../actions/ui.jsx'
import { types } from '../../types/types.jsx'

describe('Tests actions UI', () => {
  test('all actions must work ', () => {
    const payloadError = 'Error'

    const action = setError(payloadError)
    const removeErrorAction = removeError()
    const uiStartLoadingAction = uiStartLoading()
    const uiFinishLoadingAction = uiFinishLoading()

    expect(action).toEqual({
      type: types.uiSetError,
      payload: payloadError
    })

    expect(removeErrorAction).toEqual({
      type: types.uiRemoveError
    })

    expect(uiStartLoadingAction).toEqual({
      type: types.uiStartLoading
    })

    expect(uiFinishLoadingAction).toEqual({
      type: types.uiFinishLoading
    })
  })
})
