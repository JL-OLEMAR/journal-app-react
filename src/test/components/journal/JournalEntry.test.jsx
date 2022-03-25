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
import { JournalEntry } from '../../../components/journal/JournalEntry.jsx'
import 'jsdom-global/register' // → For mount a component JournalEntry

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {}
const store = mockStore(initState) // → mock store

store.dispatch = vi.fn() // → Mock dispatch

// Props of JournalEntry
const note = {
  id: 10,
  date: 0,
  title: 'Hello',
  body: 'World',
  url: 'https://somewhere.com/photo.jpg'
}

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <JournalEntry {...note} />
    </MemoryRouter>
  </Provider>
)

describe('Tests <JournalEntry />', () => {
  test("should show correctly 'snapshot'", () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should note active', () => {
    wrapper.find('div.journal-entry').prop('onClick')()
    expect(store.dispatch).toHaveBeenCalledWith(
      activeNote(note.id, { ...note }) // send note to activeNote action
    )
  })
})
