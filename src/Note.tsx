import React from 'react'
import {useNote} from './NoteLayout'
import {Badge, Col, Row, Stack} from 'react-bootstrap'

const Note = () => {
  const note = useNote()
  return (
    <>
      <Row className='align-items-center mb-4'>
        <Col>
          <h1>{note.title}</h1>
          <Stack gap={1} direction='horizontal' className='flex-wrap'>
            {note.tags.map((tag) => {
              return (
                <Badge key={tag.id} className='text-truncate'>
                  {tag.label}
                </Badge>
              )
            })}
          </Stack>
        </Col>
      </Row>
    </>
  )
}

export default Note
