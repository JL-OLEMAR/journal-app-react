import '@testing-library/jest-dom'
import { act } from '@testing-library/react'
import { mount } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { login } from '../../actions/auth'
import { firebase } from '../../firebase/firebase-config'
import { AppRouter } from '../../routers/AppRouter'

jest.mock('../../actions/auth', () => ({
  login: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: {
      id: 'ABC'
    },
    notes: []
  }
}
const store = mockStore(initState)
store.dispatch = jest.fn()

describe('Pruebas en <AppRouter />', () => {
  test('debe de llamar el login si estoy autenticado', async () => {
    let user
    await act(async () => {
      const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456')
      user = userCred.user

      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      )
    })
    expect(login).toHaveBeenCalledWith('kDHFDagdQcOXoMbphUsVjGsHLtv2', null)
  })
})
