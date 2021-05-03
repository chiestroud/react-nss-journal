import React, { useState } from 'react';
import {
  Card, CardTitle, CardText, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { deleteJournal } from '../helpers/data/journalData';
import JournalForm from '../JournalForm';

const JournalCard = ({
  date,
  comments,
  setJournal,
  firebasekey
}) => {
  const [editing, setEditing] = useState(false);

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteJournal(firebasekey)
          .then((journalArray) => setJournal(journalArray));
        break;
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      default:
        console.warn('error?');
    }
  };

  return (
    <Card body className='card'>
      <CardTitle tag="h5">{date}</CardTitle>
      <CardText>Comments: {comments}</CardText>
      <Button color='danger' onClick={() => handleClick('delete')}>Delete Journal</Button>
      <Button color='success' onClick={() => handleClick('edit')}>{editing ? 'Close' : 'Edit Journal'}</Button>
      {editing && <JournalForm
        setJournal={setJournal}
        firebasekey={firebasekey}
        date={date}
        comments={comments}
      />}
    </Card>
  );
};

JournalCard.propTypes = {
  date: PropTypes.any.isRequired,
  comments: PropTypes.string.isRequired,
  firebasekey: PropTypes.string,
  setJournal: PropTypes.func
};

export default JournalCard;
