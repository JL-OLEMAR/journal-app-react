import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import validator from 'validator'

import { useForm } from '../../hooks/useForm.jsx'
import { startRegisterWithEmailPasswordName } from '../../actions/auth.jsx'
import { removeError, setError } from '../../actions/ui.jsx'

export const RegisterScreen = () => {
  const dispatch = useDispatch()
  const { msgError } = useSelector(state => state.ui)

  const [formValues, handleInputChange] = useForm({
    name: 'Hernando',
    email: 'nando@gmail.com',
    password: '123456',
    password2: '123456'
  })

  const { name, email, password, password2 } = formValues

  const handleRegister = (e) => {
    e.preventDefault()

    if (isFormValid()) {
      dispatch(startRegisterWithEmailPasswordName(email, password, name))
    }
  }

  const isFormValid = () => {
    if (name.trim().length === 0) {
      dispatch(setError('Name is required!'))

      return false
    } else if (!validator.isEmail(email)) {
      dispatch(setError('Email is not valid!'))

      return false
    } else if (password !== password2 || password.length < 5) {
      dispatch(setError('Password should be at least 6 characters and match each other'))

      return false
    }
    dispatch(removeError())

    return true
  }

  return (
    <>
      <h3 className='auth__title'>Register</h3>
      <form
        className='animate__animated animate__fadeIn animate__faster'
        onSubmit={handleRegister}
      >

        {
          msgError &&
            (
              <div className='auth__alert-error'>
                {msgError}
              </div>
            )
        }

        <input
          autoComplete='off'
          className='auth__input'
          name='name'
          placeholder='Name'
          type='text'
          value={name}
          onChange={handleInputChange}
        />

        <input
          autoComplete='off'
          className='auth__input'
          name='email'
          placeholder='Email'
          type='text'
          value={email}
          onChange={handleInputChange}
        />

        <input
          className='auth__input'
          name='password'
          placeholder='Password'
          type='password'
          value={password}
          onChange={handleInputChange}
        />

        <input
          className='auth__input'
          name='password2'
          placeholder='Confirm password'
          type='password'
          value={password2}
          onChange={handleInputChange}
        />

        <button
          className='btn btn-primary btn-block mb-5'
          type='submit'
        >
          Register
        </button>

        <Link
          className='link conf-center'
          to='/auth/login'
        >
          Already registered?
        </Link>
      </form>
    </>
  )
}
