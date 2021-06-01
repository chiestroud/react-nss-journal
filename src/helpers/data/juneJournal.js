import axios from 'axios';
import firebaseConfig from '../apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getJuneJournal = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/june.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((err) => reject(err));
});

const addJuneJournal = (juneJournal) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/june.json`, juneJournal)
    .then((response) => {
      const body = { firebasekey: response.data.name };
      axios.patch(`${dbUrl}/june/${response.data.name}.json`, body)
        .then(() => {
          getJuneJournal().then((juneJournalArray) => resolve(juneJournalArray));
        });
    }).catch((err) => reject(err));
});

const deleteJuneJournal = (firebasekey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/june/${firebasekey}.json`)
    .then(() => getJuneJournal().then((journalArray) => resolve(journalArray)))
    .catch((err) => reject(err));
});

const updateJuneJournal = (journal) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/june/${journal.firebasekey}.json`, journal)
    .then(() => getJuneJournal().then(resolve))
    .catch((err) => reject(err));
});

const searchJuneJournal = (searchValue) => new Promise((resolve, reject) => {
  getJuneJournal().then((juneArray) => {
    const searchItems = juneArray.filter((s) => s.comments.toLowerCase().includes(searchValue));
    resolve(searchItems);
  })
    .catch((err) => reject(err));
});

const searchJuneCategoryJournal = (searchValue) => new Promise((resolve, reject) => {
  getJuneJournal().then((juneArray) => {
    const searchItems = juneArray.filter((s) => s.select.includes(searchValue));
    resolve(searchItems);
  })
    .catch((err) => reject(err));
});

export {
  getJuneJournal,
  addJuneJournal,
  deleteJuneJournal,
  updateJuneJournal,
  searchJuneJournal,
  searchJuneCategoryJournal
};
