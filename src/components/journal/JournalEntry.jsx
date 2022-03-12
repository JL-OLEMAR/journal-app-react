import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { format } from 'date-fns'

import { activeNote } from '../../actions/notes.jsx'

export const JournalEntry = ({ id, date, title, body, url }) => {
  const dispatch = useDispatch()

  const dayOfWeek = format(date, 'eeee') // Monday, Tuesday, ..., Sunday
  const dayOfMonth = format(date, 'dd') // 01, 02, ..., 31
  const Month = format(date, 'MMM') // Jan, Feb, ..., Dec

  const handleEntryCLick = () => {
    dispatch(activeNote(id, { date, title, body, url }))
  }

  return (
    <Link className='ancla-note' to='/#note'>
      <div
        className='journal-entry pointer animate__animated animate__fadeIn animate__faster'
        onClick={handleEntryCLick}
      >
        {
        url && (
          <div
            className='entry-picture'
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${url})`
            }}
          />)
        }

        <div className='entry-body'>
          <p className='entry-title'>
            {title}
          </p>
        </div>

        <div className='entry-date-box config-center'>
          <span>{dayOfWeek}</span>
          <h5>{Month}/{dayOfMonth}</h5>
        </div>
      </div>
    </Link>
  )
}
