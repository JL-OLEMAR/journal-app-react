import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import moment from 'moment'

import { activeNote } from '../../actions/notes.jsx'

export const JournalEntry = ({ id, date, title, body, url }) => {
  const noteDate = moment(date)
  const dispatch = useDispatch()

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
          <span>{noteDate.format('dddd')}</span>
          <h4>{noteDate.format('Do')}</h4>
        </div>
      </div>
    </Link>
  )
}
