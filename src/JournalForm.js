import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Label, Input, Button
} from 'reactstrap';
import { addMayJournal, updateJournal } from './helpers/data/journalData';

export default function JournalForm({
  setJournal, date, firebasekey, comments
}) {
  const [mayJournal, setMayJournal] = useState({
    date: date || '',
    comments: comments || '',
    firebasekey: firebasekey || null
  });

  const handleInputChange = (e) => {
    setMayJournal((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mayJournal.firebasekey) {
      updateJournal(mayJournal).then((journalArray) => setJournal(journalArray));
    } else {
      addMayJournal(mayJournal).then((journalArray) => setJournal(journalArray));
    }
  };

  return (
    <Form
      id="journalForm"
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
          value={mayJournal.date}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Comments</Label>
        <Input
          type="textarea"
          name="comments"
          id="exampleText"
          value={mayJournal.comments}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button color='info' type='submit' onSubmit={handleSubmit}>Submit Journal</Button>
    </Form>
  );
}

JournalForm.propTypes = {
  setJournal: PropTypes.func,
  firebasekey: PropTypes.string,
  comments: PropTypes.string,
  date: PropTypes.any
};
