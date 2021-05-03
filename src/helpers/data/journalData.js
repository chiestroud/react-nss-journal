import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getMayJournal = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/may.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((err) => reject(err));
});

const addMayJournal = (mayJournal) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/may.json`, mayJournal)
    .then((response) => {
      const body = { firebasekey: response.data.name };
      axios.patch(`${dbUrl}/may/${response.data.name}.json`, body)
        .then(() => {
          getMayJournal().then((mayJournalArray) => resolve(mayJournalArray));
        });
    }).catch((err) => reject(err));
});

const deleteJournal = (firebasekey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/may/${firebasekey}.json`)
    .then(() => getMayJournal().then((journalArray) => resolve(journalArray)))
    .catch((err) => reject(err));
});

const updateJournal = (journal) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/may/${journal.firebasekey}.json`, journal)
    .then(() => getMayJournal().then(resolve))
    .catch((err) => reject(err));
});

export {
  getMayJournal, addMayJournal, deleteJournal, updateJournal
};
