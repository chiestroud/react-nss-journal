import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form, FormGroup, Label, Input, Button
} from 'reactstrap';
import { addJuneJournal, updateJuneJournal } from './helpers/data/juneJournal';
import getCurrentUserUid from './userData';

export default function JournalForm({
  setOpenForm, setJuneJournals, date, comments, link, firebasekey
}) {
  const [juneJournal, setJuneJournal] = useState({
    date: date || '',
    comments: comments || '',
    firebasekey: firebasekey || null,
    link: link || '',
    uid: getCurrentUserUid()
  });

  const handleInputChange = (e) => {
    setJuneJournal((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (juneJournal.firebasekey) {
      updateJuneJournal(juneJournal).then((journalArray) => setJuneJournals(journalArray));
      setOpenForm(false);
    } else {
      addJuneJournal(juneJournal).then((journalArray) => setJuneJournals(journalArray));
      setOpenForm(false);
    }
  };

  return (
    <Form
      id="juneForm"
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
          value={juneJournal.date}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="link">Link</Label>
        <Input
          type="url"
          name="link"
          id="link"
          placeholder="link"
          value={juneJournal.link}
          onChange={handleInputChange}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleText">Comments</Label>
        <Input
          type="textarea"
          name="comments"
          id="exampleText"
          value={juneJournal.comments}
          onChange={handleInputChange}
        />
      </FormGroup>
      <Button color='info' type='submit' onSubmit={handleSubmit}>Submit Journal</Button>
    </Form>
  );
}

JournalForm.propTypes = {
  setOpenForm: PropTypes.func,
  setJuneJournals: PropTypes.func,
  comments: PropTypes.string,
  date: PropTypes.any,
  link: PropTypes.string,
  firebasekey: PropTypes.string
};
