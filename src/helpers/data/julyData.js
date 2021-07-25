import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getJulyJournal = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/july.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    }).catch((err) => reject(err));
});

const addJulyJournal = (julyJournal) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/july.json`, julyJournal)
    .then((response) => {
      const body = { firebasekey: response.data.name };
      axios.patch(`${dbUrl}/july/${response.data.name}.json`, body)
        .then(() => {
          getJulyJournal().then((julyJournalArray) => resolve(julyJournalArray));
        });
    }).catch((err) => reject(err));
});

const deletejulyJournal = (firebasekey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/july/${firebasekey}.json`)
    .then(() => getJulyJournal().then((journalArray) => resolve(journalArray)))
    .catch((err) => reject(err));
});

const updateJulyJournal = (journal) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/july/${journal.firebasekey}.json`, journal)
    .then(() => getJulyJournal().then(resolve))
    .catch((err) => reject(err));
});

export {
  getJulyJournal, addJulyJournal, deletejulyJournal, updateJulyJournal
};
