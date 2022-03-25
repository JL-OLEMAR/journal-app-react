/**
 * @jest-environment node
 */

import { describe, expect, test, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { activeNote } from '../../../actions/notes.jsx'
import { NoteScreen } from '../../../components/notes/NoteScreen.jsx'
import 'jsdom-global/register' // → For mount a component NoteScreen

vi.mock('../../../actions/notes.jsx', () => ({
  activeNote: vi.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = { // → See in Redux DevTools
  auth: {
    uid: '123',
    name: 'Test User'
  },
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    notes: [],
    active: {
      id: 1234,
      title: 'Hello',
      body: 'world',
      date: 0
    }
  }
}
const store = mockStore(initState) // → mock store

store.dispatch = vi.fn() // → Mock dispatch

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <NoteScreen />
    </MemoryRouter>
  </Provider>
)

describe('Test <NoteScreen />', () => {
  test('should show correctly \'snapshot\'', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should dispatch activeNote', () => {
    // with some form's field
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'title test simulating'
      }
    })

    // example dispatch(activeNote(formValues.id, { ...formValues }))
    expect(activeNote).toHaveBeenLastCalledWith(
      1234, // id
      {
        body: 'world',
        title: 'title test simulating', // →→→ === line 64
        id: 1234,
        date: 0
      } // active note === formValues
    )
  })
})
