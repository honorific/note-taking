import {Card} from 'react-bootstrap'
import {simplifiedNote} from './NoteList'
import {Link} from 'react-router-dom'
import styles from './NoteCard.module.css'

const NoteCard = ({id, title, tags}: simplifiedNote) => {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body></Card.Body>
    </Card>
  )
}

export default NoteCard
