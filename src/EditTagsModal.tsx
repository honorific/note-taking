import React from 'react'
import {Button, Col, Form, Modal, Row, Stack} from 'react-bootstrap'
import {NoteListProps} from './NoteList'

type EditTagsModalProps = {
  show: boolean
  handleClose: () => void
} & NoteListProps

const EditTagsModal = ({
  availableTags,
  handleClose,
  show,
  deleteTag,
  updateTag,
}: EditTagsModalProps) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map((tag) => (
              <Row key={tag.id}>
                <Col>
                  <Form.Control
                    type='text'
                    value={tag.label}
                    onChange={(e) => updateTag(tag.id, e.target.value)}
                  />
                </Col>
                <Col xs='auto'>
                  <Button
                    variant='outline-danger'
                    onClick={(e) => deleteTag(tag.id)}
                  >
                    &times;
                  </Button>
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
