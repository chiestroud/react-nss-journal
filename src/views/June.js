import { Button } from 'reactstrap';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import JuneJournalForm from '../JuneJournalForm';
import { getJuneJournal } from '../helpers/data/juneJournal';
import JuneCard from '../components/JuneCard';

export default function June({ user }) {
  const [openForm, setOpenForm] = useState(false);
  const [juneJournals, setJuneJournals] = useState([]);

  const handleClick = () => {
    setOpenForm((prevState) => !prevState);
  };

  useEffect(() => {
    getJuneJournal().then((response) => setJuneJournals(response));
  });

  return (
    <div>
      <h2>June page</h2>
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
