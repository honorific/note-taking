import NoteForm from './NoteForm'

const NewNote = () => {
  const obj = {
    title: 'ali',
    markdown: 'gholi',
    tags: {id: 'first', label: '1st'},
  }
  return (
    <>
      <h1 className='mb-4'>New note</h1>
      <NoteForm onSubmit={(obj) => console.log(obj)} />
    </>
  )
}

export default NewNote
