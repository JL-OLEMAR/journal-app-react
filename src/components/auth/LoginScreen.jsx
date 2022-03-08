import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'

import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth.jsx'
import { removeError, setError } from '../../actions/ui.jsx'
import { useForm } from '../../hooks/useForm.jsx'
import googleLogo from '../../google-logo.svg'

import './LoginScreen.css'

export const LoginScreen = () => {
  const dispatch = useDispatch()
  const { loading, msgError } = useSelector(state => state.ui)

  const [formValues, handleInputChange] = useForm({
    email: '',
    password: ''
  })

  const { email, password } = formValues

  const handleLogin = (e) => {
    e.preventDefault()

    if (isFormValid()) {
      // Login with email and password
      dispatch(startLoginEmailPassword(email, password))
    }
  }

  // Login with google
  const handleGoogleLogin = () => dispatch(startGoogleLogin())

  // Valid email and password of the form
  const isFormValid = () => {
    if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid!'))

      return false
    } else if (password.length < 5) {
      dispatch(setError('Password should be at least 6 characters and match each other'))

      return false
    }
    dispatch(removeError())

    return true
  }

  return (
    <>
      <h3 className='auth-title'>Login</h3>
      <form
        className='animate__animated animate__fadeIn animate__faster'
        onSubmit={handleLogin}
      >
        {msgError && <div className='alert-error config-center'>{msgError}</div>}

        <input
          autoFocus
          autoComplete='off'
          className='auth-input'
          name='email'
          placeholder='Email'
          type='email'
          value={email}
          onChange={handleInputChange}
        />

        <input
          className='auth-input'
          name='password'
          placeholder='Password'
          type='password'
          value={password}
          onChange={handleInputChange}
        />

        <button
          className='btn btn-primary btn-block auth-btn'
          disabled={loading}
          type='submit'
        >
          Login
        </button>

        <div className='social-networks'>
          <p>or</p>
          <div
            className='btn-google mt-1'
            onClick={handleGoogleLogin}
          >
            <div className='google-icon-wrapper'>
              <img
                alt='google button'
                className='google-icon'
                src={googleLogo}
              />
            </div>
            <p className='btn-text'>
              <b>Sign in with google</b>
            </p>
          </div>
        </div>

        <Link
          className='link config-center'
          to='/auth/register'
        >
          Create new account
        </Link>
      </form>
    </>
  )
}
