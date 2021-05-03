import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import JournalCard from '../components/JournalCard';
import { getMayJournal } from '../helpers/data/journalData';
import JournalForm from '../JournalForm';

export default function May() {
  const [journal, setJournal] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const handleClick = () => {
    setShowButton((prevState) => !prevState);
  };

  useEffect(() => {
    getMayJournal().then((response) => setJournal(response));
  }, []);

  return (
    <div className='App container'>
      <header>May Journal</header>
      <Button color='info' className='m-2' onClick={handleClick}>{showButton !== true ? 'Add Journal' : 'Close Form'}</Button>
      {showButton === true
        && <JournalForm
            setJournal={setJournal}
          />}
      {journal.map((info) => (
        <JournalCard key={info.firebasekey}
          firebasekey={info.firebasekey}
          date={info.date}
          comments={info.comments}
          setJournal={setJournal}
        />
      ))}
    </div>
  );
}
