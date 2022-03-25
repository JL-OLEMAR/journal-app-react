/**
 * @jest-environment node
 */

import { describe, expect, test } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { types } from '../../../types/types.jsx'
import { RegisterScreen } from '../../../components/auth/RegisterScreen.jsx'
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
const store = mockStore(initState) // → mock store for global

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter>
      <RegisterScreen />
    </MemoryRouter>
  </Provider>
)

describe('Tests <RegisterScreen />', () => {
  test('should wrapper the component RegisterScreen', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should dispatch the setError action', () => {
    const nameField = wrapper.find('input[name="name"]')
    const emailField = wrapper.find('input[name="email"]')

    nameField.simulate('change', {
      target: {
        name: 'name',
        value: 'test2'
      }
    })

    emailField.simulate('change', {
      target: {
        name: 'email',
        value: '' // → empty email for the setError action
      }
    })

    wrapper.find('form').simulate('submit', {
      preventDefault () {}
    })

    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: 'Email is not valid!'
    })
  })

  test('should show the alert box with error', () => {
    const initState = { // → See in Redux DevTools
      auth: {},
      ui: {
        loading: false,
        msgError: 'Email is not valid for test!!!'
      }
    }
    const store = mockStore(initState) // → mock store in scope

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    )

    expect(wrapper.find('.alert-error').exists()).toBe(true)
    expect(wrapper.find('.alert-error').text().trim()).toBe(initState.ui.msgError)
  })
})
