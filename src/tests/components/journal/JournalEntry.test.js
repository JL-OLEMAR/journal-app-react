import '@testing-library/jest-dom'
import { mount } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { activeNote } from '../../../actions/notes'
import { JournalEntry } from '../../../components/journal/JournalEntry'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}
const store = mockStore(initState)
store.dispatch = jest.fn()

const nota = {
  id: 10,
  date: 0,
  title: 'Hola',
  body: 'mundo',
  url: 'https://algunlugar.com/foto.jpg'
}

const wrapper = mount(
  <Provider store={store}>
    <JournalEntry {...nota} />
  </Provider>
)

describe('Pruebas en <JournalEntry />', () => {
  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('debe de activar la nota', () => {
    wrapper.find('.journal__entry').prop('onClick')()
    expect(store.dispatch).toHaveBeenCalledWith(
      activeNote(nota.id, { ...nota })
    )
  })
})
