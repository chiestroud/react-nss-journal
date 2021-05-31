import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import { deleteJuneJournal } from '../helpers/data/juneJournal';
import JuneJournalForm from '../JuneJournalForm';

const JuneCard = ({
  date, comments, firebasekey, uid, link, user, setJuneJournals, setOpenForm
}) => {
  const [editing, setEditing] = useState(false);

  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deleteJuneJournal(firebasekey)
          .then((journalArray) => setJuneJournals(journalArray));
        break;
      case 'edit':
        setEditing((prevState) => !prevState);
        break;
      default:
        console.warn('error');
    }
  };

  return (
    <div>
      <Card key={firebasekey}>
        <CardBody>
          <CardTitle tag="h5">{date}</CardTitle>
          <CardText>{comments}</CardText>
          <CardText>{link}</CardText>
          {(user && user.uid === uid) && <div>
            <Button onClick={() => handleClick('edit')}>{editing ? 'Close Form' : 'Edit'}</Button>
            <Button onClick={() => handleClick('delete')}>Delete</Button>
            {editing && <JuneJournalForm
              setOpenForm={setOpenForm}
              setJuneJournals={setJuneJournals}
              firebasekey={firebasekey}
              date={date}
              comments={comments}
              link={link}
              uid={uid}
              user={user}
            />}
          </div>}
        </CardBody>
      </Card>
    </div>
  );
};

JuneCard.propTypes = {
  date: PropTypes.any.isRequired,
  comments: PropTypes.string.isRequired,
  firebasekey: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  user: PropTypes.any,
  setJuneJournals: PropTypes.func,
  setOpenForm: PropTypes.func
};

export default JuneCard;
