import {useMemo, useState} from 'react'
import {Button, Col, Form, FormControl, Row, Stack} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ReactSelect from 'react-select'
import {Note, Tag} from './App'
import NoteCard from './NoteCard'
import EditTagsModal from './EditTagsModal'

export type simplifiedNote = {
  tags: Tag[]
  title: string
  id: string
}

export type NoteListProps = {
  availableTags: Tag[]
  notes?: simplifiedNote[]
  deleteTag: (id: string) => void
  updateTag: (id: string, label: string) => void
}

const NoteList = ({availableTags, notes, deleteTag, updateTag}: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [editTagsModalIsOpen, setEditTagsModelIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const filteredNotes = useMemo(() => {
    return notes?.filter((note) => {
      return (
        (title === '' ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id),
          ))
      )
    })
  }, [title, selectedTags, notes])

  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs='auto'>
          <Stack gap={2} direction='horizontal'>
            <Link to='/new'>
              <Button variant='primary'>create</Button>
            </Link>
            <Button
              variant='outline-secondary'
              onClick={() => setEditTagsModelIsOpen(true)}
            >
              Edit tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row className='mb-4'>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type='text'
                value={title}
                onChange={(e) => e.target.value}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                options={availableTags.map((tag) => {
                  return {label: tag.label, value: tag.id}
                })}
                isMulti
                value={selectedTags.map((tags) => {
                  return {
                    label: tags.label,
                    value: tags.id,
                  }
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return {
                        label: tag.label,
                        id: tag.value,
                      }
                    }),
                  )
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className='g-3'>
        {filteredNotes?.map((note) => (
          <Col key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </Col>
        ))}
      </Row>
      <EditTagsModal
        availableTags={availableTags}
        show={editTagsModalIsOpen}
        handleClose={() => setEditTagsModelIsOpen(false)}
        updateTag={updateTag}
        deleteTag={deleteTag}
      />
    </>
  )
}

export default NoteList
