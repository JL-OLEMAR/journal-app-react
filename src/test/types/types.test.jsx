import { types } from '../../types/types.jsx'

describe('Test the types', () => {
  test('Must have these Types', () => {
    const allTypes = {
      login: '[Auth] Login',
      logout: '[Auth] Logout',

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
    }

    expect(types).toEqual(allTypes)
  })
})
