import { Button, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import JuneJournalForm from '../JuneJournalForm';
import { getJuneJournal, searchJuneCategoryJournal, searchJuneJournal } from '../helpers/data/juneJournal';
import JuneCard from '../components/JuneCard';

export default function June({ user }) {
  const [openForm, setOpenForm] = useState(false);
  const [juneJournals, setJuneJournals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleClick = () => {
    setOpenForm((prevState) => !prevState);
  };

  const handleSearchClick = () => {
    searchJuneJournal(searchTerm).then((response) => setJuneJournals(response));
  };

  const handleCategoryClick = () => {
    searchJuneCategoryJournal(searchTerm).then((response) => setJuneJournals(response));
  };

  useEffect(() => {
    getJuneJournal().then((response) => setJuneJournals(response));
  }, []);

  return (
    <div>
      <h2>June page</h2>
      <input
        type='text'
        placeholder="Search..."
        onChange={(event) => setSearchTerm(event.target.value)}
      /><Button onClick={handleSearchClick}>Search</Button>
        <Input
          type='select'
          name="select"
          id="exampleSelect"
        placeholder="Search Category"
          onChange={(event) => setSearchTerm(event.target.value)}>
          <option value="">Select</option>
          <option>Read</option>
          <option>Write</option>
        </Input>
      <Button onClick={handleCategoryClick}>Search</Button>
      <Button color='info' onClick={handleClick}>{openForm ? 'Close Form' : 'Open Form'}</Button>
      {openForm
        && <JuneJournalForm
          setJuneJournals={setJuneJournals} setOpenForm={setOpenForm} />
      }
      {juneJournals.map((juneJournal) => (
        <JuneCard key={juneJournal.firebasekey}
          {...juneJournal}
          user={user}
          setJuneJournals={setJuneJournals}
          setOpenForm={setOpenForm}
        />
      ))};
    </div>
  );
}

June.propTypes = {
  user: PropTypes.any
};
