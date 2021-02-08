import { types } from '../../types/types'

describe('Pruebas con nuestros tipos', () => {
  test('debe de tener estos types', () => {
    expect(types).toEqual({
      login: '[auth] Login',
      logout: '[auth] Logout',

      uiSetError: '[UI] Set Error',
      uiRemoveError: '[UI] Remove Error',

      uiStartLoading: '[UI] Start loading',
      uiFinishLoading: '[UI] Finish loading',

      notesAddNew: '[Notes] New note',
      notesLoad: '[Notes] Load notes',
      notesActive: '[Notes] Set active note',
      notesDelete: '[Notes] Delete note',
      notesFileUrl: '[Notes] Updated image url',
      notesUpdated: '[Notes] Updated note',
      notesLogoutCleaning: '[Notes] Logout Cleaning'
    })
  })
})
