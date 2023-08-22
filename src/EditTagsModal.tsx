import React from 'react'
import {Button, Col, Form, Modal, Row, Stack} from 'react-bootstrap'
import {NoteListProps} from './NoteList'

const EditTagsModal = ({availableTags}: NoteListProps) => {
  return (
    <Modal>
      <Modal.Header closeButton>
        <Modal.Title>Edit tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col></Col>
                <Col xs='auto'>
                  <Button variant='outline-danger'>&times;</Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default EditTagsModal
