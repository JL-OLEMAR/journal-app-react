import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk'

import { authReducer } from '../reducers/authReducer.jsx'
import { notesReducer } from '../reducers/notesReducer.jsx'
import { uiReducer } from '../reducers/uiReducer.jsx'

const composeEnhancers = (
  typeof window !== 'undefined' && (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
) || compose

const reducers = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  notes: notesReducer
})

export const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)
