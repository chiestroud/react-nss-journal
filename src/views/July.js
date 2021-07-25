import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { getJulyJournal } from '../helpers/data/julyData';
import JulyJournalForm from '../JulyJournalForm';
import JulyCard from '../components/JulyCard';

export default function July({ user }) {
  const [journal, setJournal] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const handleClick = () => {
    setShowButton((prevState) => !prevState);
  };

  useEffect(() => {
    getJulyJournal().then((response) => setJournal(response));
  });

  return (
    <div className='App container'>
      <header>July Journal</header>
      <Button color='info' className='m-2' onClick={handleClick}>{showButton !== true ? 'Add Journal' : 'Close Form'}</Button>
      {showButton
        && <JulyJournalForm
        setJournal={setJournal}
        user={user}
        />}
      {journal.reverse().map((info) => (
        <JulyCard key={info.firebasekey}
          firebasekey={info.firebasekey}
          date={info.date}
          comments={info.comments}
          setJournal={setJournal}
          user={user}
          uid={info.uid}
        />
      ))}
    </div>
  );
}

July.propTypes = {
  user: PropTypes.any
};
