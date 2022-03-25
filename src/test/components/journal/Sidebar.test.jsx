/**
 * @jest-environment node
 */

import { beforeEach, describe, expect, test, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { startLogout } from '../../../actions/auth.jsx'
import { startNewNote } from '../../../actions/notes.jsx'
import { Sidebar } from '../../../components/journal/Sidebar.jsx'
import 'jsdom-global/register' // → For mount a component

vi.mock('../../../actions/auth.jsx', () => ({
  startLogout: vi.fn()
}))

vi.mock('../../../actions/notes.jsx', () => ({
  startNewNote: vi.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = { // → See in Redux DevTools
  auth: {
    uid: '123',
    name: 'John Doe'
  },
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: null,
    notes: []
  }
}
let store = mockStore(initState) // → mock store

store.dispatch = vi.fn() // → Mock dispatch

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <Sidebar />
    </MemoryRouter>
  </Provider>
)

describe('Tests <Sidebar />', () => {
  beforeEach(() => {
    store = mockStore(initState)
    vi.clearAllMocks()
  })

  test('should show correctly \'snapshot\'', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should call the startLogout action', () => {
    wrapper.find('button.btn.btn-danger').prop('onClick')()
    expect(startLogout).toHaveBeenCalled()
  })

  test('should call the startNewNote action', () => {
    wrapper.find('button.btn.btn-new-entry').prop('onClick')()
    expect(startNewNote).toHaveBeenCalled()
  })
})
