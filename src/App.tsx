import 'bootstrap/dist/css/bootstrap.min.css'
import {Container} from 'react-bootstrap'
import {Routes, Route, Navigate} from 'react-router-dom'
import NewNote from './NewNote'
import useLocalStorage from './useLocalStorage'
import {useMemo} from 'react'
import {v4 as uuidV4} from 'uuid'
import NoteList from './NoteList'
import NoteLayout from './NoteLayout'
import Note from './Note'
import EditNote from './EditNote'

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {...note, tags: tags.filter((tag) => note.tagIds.includes(tag.id))}
    })
  }, [])

  const onCreateNote = ({tags, ...data}: NoteData) => {
    setNotes((prevNotes) => {
      console.log('data is: ', data)
      console.log('tags are: ', tags)
      return [
        ...prevNotes,
        {...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id)},
      ]
    })
  }

  const updateTag = (id: string, label: string) => {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id === id) {
          return {...tag, label}
        } else {
          return tag
        }
      })
    })
  }

  const deleteTag = (id: string) => {
    setTags((prevTags) => {
      return prevTags.filter((tag) => tag.id !== id)
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id)
    })
  }

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag])
  }

  const onUpdateNote = (id: string, {tags, ...data}: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          console.log('Note is: ', note)
          console.log('data is: ', data)
          return {
            ...note,
            ...data,
            tagIds: tags.map((tag) => tag.id),
          }
        } else {
          return note
        }
      })
    })
  }
  return (
    <Container className='my-4'>
      <Routes>
        <Route
          path='/'
          element={
            <NoteList
              notes={notesWithTags}
              availableTags={tags}
              updateTag={updateTag}
              deleteTag={deleteTag}
            />
          }
        ></Route>
        <Route
          path='/new'
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        ></Route>
        <Route path='/:id' element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path='edit'
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App
