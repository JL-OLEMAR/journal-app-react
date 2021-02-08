import { removeError, setError, uiFinishLoading, uiStartLoading } from '../../actions/ui'
import { types } from '../../types/types'

describe('Pruebas en ui-actions', () => {
  test('todas las acciones debe de funcionar', () => {
    const action = setError('HELP!!!!')
    expect(action).toEqual({
      type: types.uiSetError,
      payload: 'HELP!!!!'
    })

    const removeErrorAction = removeError()
    expect(removeErrorAction).toEqual({
      type: types.uiRemoveError
    })

    const uiStartLoadingAction = uiStartLoading()
    expect(uiStartLoadingAction).toEqual({
      type: types.uiStartLoading
    })

    const uiFinishLoadingAction = uiFinishLoading()
    expect(uiFinishLoadingAction).toEqual({
      type: types.uiFinishLoading
    })
  })
})
