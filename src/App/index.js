import React, { useState, useEffect } from 'react';
import JournalCard from '../components/JournalCard';
import { getMayJournal } from '../helpers/data/journalData';
import JournalForm from '../JournalForm';
import './App.scss';

function App() {
  const [journal, setJournal] = useState([]);

  useEffect(() => {
    getMayJournal().then((response) => setJournal(response));
  }, []);

  console.warn(journal);

  return (
    <div className='App container'>
      <JournalForm
        setJournal={setJournal}
      />
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

export default App;
