import React, { useState } from 'react';
import {
  Card, CardTitle, CardText, Button
} from 'reactstrap';
import PropTypes from 'prop-types';
import { deleteJournal } from '../helpers/data/journalData';
import JournalForm from '../JournalForm';

const JournalCard = ({
  user,
  date,
  comments,
  setJournal,
  firebasekey,
  uid
}) => {
  const [editing, setEditing] = useState(false);
  console.warn(uid);

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
    <div className="journalCard">
    <Card body className='card' key={firebasekey} id={uid}>
      <CardTitle tag="h5">{date}</CardTitle>
      <CardText>Comments: {comments}</CardText>
      {user.uid === uid
        && <div>
          <Button color='danger' onClick={() => handleClick('delete')}>Delete Journal</Button>
          <Button color='success' onClick={() => handleClick('edit')}>{editing ? 'Close' : 'Edit Journal'}</Button>
          {editing && <JournalForm
            setJournal={setJournal}
            firebasekey={firebasekey}
            date={date}
            comments={comments}
            uid={uid}
            user={user}
          />}
        </div>
      }
     </Card>
    </div>
  );
};

JournalCard.propTypes = {
  date: PropTypes.any.isRequired,
  comments: PropTypes.string.isRequired,
  firebasekey: PropTypes.string,
  setJournal: PropTypes.func,
  user: PropTypes.any,
  uid: PropTypes.string
};

export default JournalCard;
