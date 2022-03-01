import { useSelector } from 'react-redux'

import { JournalEntry } from './JournalEntry.jsx'

export const JournalEntries = () => {
  const { notes } = useSelector(state => state.notes)

  return (
    <div className='journal-entries'>
      {notes.map(note => <JournalEntry key={note.id} {...note} />)}
    </div>
  )
}
