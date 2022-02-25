import { Provider } from 'react-redux'

import { AppRouter } from './routers/AppRouter.jsx'
import { store } from './store/store.jsx'

export const JournalApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}
