import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth.jsx'
import { useForm } from '../../hooks/useForm.jsx'
import './LoginScreen.css'

export const LoginScreen = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.ui)

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: ''
  })

  const { email, password } = formValues

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(startLoginEmailPassword(email, password))
  }

  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin())
  }

  return (
    <>
      <h3 className='auth-title'>Login</h3>
      <form
        className='animate__animated animate__fadeIn animate__faster'
        onSubmit={handleLogin}
      >
        <input
          autoComplete='off'
          className='input'
          name='email'
          placeholder='Email'
          type='text'
          value={email}
          onChange={handleInputChange}
        />

        <input
          className='input'
          name='password'
          placeholder='Password'
          type='password'
          value={password}
          onChange={handleInputChange}
        />

        <button
          className='btn btn-primary btn-block'
          disabled={loading}
          type='submit'
        >
          Login
        </button>

        <div className='social-networks'>
          <p>Login with social networks</p>
          <div
            className='google-btn'
            onClick={handleGoogleLogin}
          >
            <div className='google-icon-wrapper'>
              <img
                alt='google button'
                className='google-icon'
                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
              />
            </div>
            <p className='btn-text'>
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link
          className='link conf-center'
          to='/auth/register'
        >
          Create new account
        </Link>
      </form>
    </>
  )
}
