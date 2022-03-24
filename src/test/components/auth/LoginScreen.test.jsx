/**
 * @jest-environment node
 */

import { beforeEach, describe, expect, test, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { LoginScreen } from '../../../components/auth/LoginScreen.jsx'
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth.jsx'
import 'jsdom-global/register' // → For mount a component

vi.mock('../../../actions/auth.jsx', () => ({
  startGoogleLogin: vi.fn(),
  startLoginEmailPassword: vi.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = { // → See in Redux DevTools
  auth: {},
  ui: {
    loading: false,
    msgError: null
  }
}
let store = mockStore(initState) // → mock store

store.dispatch = vi.fn() // → Mock dispatch

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <LoginScreen />
    </MemoryRouter>
  </Provider>
)

describe('Tests <LoginScreen />', () => {
  beforeEach(() => {
    store = mockStore(initState)
    vi.clearAllMocks()
  })

  test('should wrapper the component LoginScreen', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should dispatch startGoogleLogin action', () => {
    wrapper.find('.btn-google').prop('onClick')()
    expect(startGoogleLogin).toHaveBeenCalled()
  })

  test('should dispatch startLogin with the respective arguments', () => {
    const email = 'test@testing.com'
    const password = '0123456789'

    wrapper.find('input[name="email"]').simulate('change', {
      target: {
        name: 'email',
        value: email
      }
    })

    wrapper.find('input[name="password"]').simulate('change', {
      target: {
        name: 'password',
        value: password
      }
    })

    wrapper.find('form').prop('onSubmit')({ preventDefault () {} })
    expect(startLoginEmailPassword).toHaveBeenCalledWith(email, password)
  })
})
