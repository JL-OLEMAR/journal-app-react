import { Provider } from 'react-redux'

import { store } from './store/store.jsx'
import { AppRouter } from './routers/AppRouter.jsx'

export const JournalApp = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}
