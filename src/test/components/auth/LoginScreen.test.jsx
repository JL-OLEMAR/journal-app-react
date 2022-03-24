/**
 * @jest-environment node
 */

import { beforeEach, describe, expect, test } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { LoginScreen } from '../../../components/auth/LoginScreen.jsx'
import 'jsdom-global/register' // → For mount a component

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = { // → See in Redux DevTools
  auth: {},
  ui: {
    loading: false,
    msgError: null
  }
}
let store = mockStore(initState) // mock store

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
  })

  test('should wrapper the component LoginScreen', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
