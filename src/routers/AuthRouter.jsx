import { Redirect, Route, Switch } from 'react-router-dom'

import { LoginScreen } from '../components/auth/LoginScreen.jsx'
import { RegisterScreen } from '../components/auth/RegisterScreen.jsx'

export const AuthRouter = () => {
  return (
    <div className='auth__main'>
      <div className='auth__box-container'>
        <Switch>
          <Route exact component={LoginScreen} path='/auth/login' />
          <Route exact component={RegisterScreen} path='/auth/register' />

          <Redirect to='/auth/login' />
        </Switch>
      </div>
    </div>
  )
}
