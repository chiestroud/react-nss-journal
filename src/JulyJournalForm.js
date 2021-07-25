import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Label, Input, Button
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { addJulyJournal, updateJulyJournal } from './helpers/data/julyData';

export default function JulyJournalForm({
  setJournal, date, firebasekey, comments, uid, user
}) {
  const [julyJournal, setJulyJournal] = useState({
    date: date || '',
    comments: comments || '',
    firebasekey: firebasekey || null,
    uid: uid || user.uid
  });

  const handleInputChange = (e) => {
    setJulyJournal((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value === 'select' ? e.target.selected : e.target.value
    }));
  };

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (julyJournal.firebasekey) {
      updateJulyJournal(julyJournal).then((journalArray) => setJournal(journalArray));
      history.push('/july');
    } else {
      addJulyJournal(julyJournal).then((journalArray) => setJournal(journalArray));
      history.push('/july');
    }
  };

  return (
    <Form
      id="julyJournalForm"
      autoComplete='off'
      onSubmit={handleSubmit}
    >
      <FormGroup>
        <Label for="exampleDate">Date</Label>
        <Input
          type="date"
          name="date"
          id="exampleDate"
          placeholder="date placeholder"
          value={julyJournal.date}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Comments</Label>
        <Input
          type="textarea"
          name="comments"
          id="exampleText"
          value={julyJournal.comments}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button color='info' type='submit' onSubmit={handleSubmit}>Submit Journal</Button>
    </Form>
  );
}

JulyJournalForm.propTypes = {
  setJournal: PropTypes.func,
  firebasekey: PropTypes.string,
  comments: PropTypes.string,
  date: PropTypes.any,
  uid: PropTypes.string,
  user: PropTypes.any
};
