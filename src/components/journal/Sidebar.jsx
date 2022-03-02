import { useDispatch, useSelector } from 'react-redux'

import { startLogout } from '../../actions/auth.jsx'
import { startNewNote } from '../../actions/notes.jsx'

import { JournalEntries } from './JournalEntries.jsx'

export const Sidebar = () => {
  const dispatch = useDispatch()
  const { name } = useSelector(state => state.auth)

  const handleLogout = () => {
    dispatch(startLogout())
  }

  const handleAddNew = () => {
    dispatch(startNewNote())
  }

  return (
    <aside className='journal-sidebar'>
      <div className='navbar'>
        <h3 className='mt-2'>
          <i className='far fa-moon' />
          <span>{name}</span>
        </h3>

        <button className='btn btn-danger logout-navbar mt-2' onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className='new-entry' onClick={handleAddNew}>
        <i className='far fa-calendar-plus fa-5x' />
        <p className='mt-2'>New entry</p>
      </div>

      <JournalEntries />
    </aside>
  )
}
