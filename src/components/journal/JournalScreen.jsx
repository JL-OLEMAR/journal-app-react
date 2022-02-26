import { useSelector } from 'react-redux'

import { NoteScreen } from '../notes/NoteScreen.jsx'

import { NothingSelected } from './NothingSelected.jsx'
import { Sidebar } from './Sidebar.jsx'

export const JournalScreen = () => {
  const { active } = useSelector(state => state.notes)

  return (
    <div className='journal-main-content animate__animated animate__fadeIn animate__faster'>
      <Sidebar />
      <main>
        {
          active
            ? <NoteScreen />
            : <NothingSelected />
        }

      </main>
    </div>
  )
}
