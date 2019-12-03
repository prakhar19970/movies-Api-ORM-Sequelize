
const db = require('../Database/connection');
const { director } = require('../Creation_Insertion/creating_tables');

function getAllDirectors() {
  return new Promise((resolve, reject) => {
    db.sync().then(() => {
      director.findAll()
        .then((data) => resolve((data)))
        .catch((error) => reject(error));
    });
  });
}


function getDirectorWithId(id) {
  // console.log(id);
  return new Promise((resolve, reject) => {
    db.sync().then(() => {
      director.findByPk(id).then((data) => resolve((data)))
        .catch((error) => reject(error));
    });
  });
}
function addNewDirector(newDirector) {
  return new Promise((resolve, reject) => {
    db.sync().then(() => {
      director.create({
        Director: newDirector.Director,

      }).then((data) => { resolve(data); }).catch((error) => { reject(error); });
    });
  });
}

function checkDirectorId(id) {
  // console.log(id);
  return new Promise((resolve, reject) => {
    db.sync().then(() => {
      director.count({ where: { id } }).then((count) => {
        if (count !== 0) {
          return true;
        }
        return false;
      }).then((data) => {
        resolve(data);
      }).catch((error) => { reject(error); });
    });
  });
}

function updateDirector(id, values) {
  // console.log(`${id} ${values}`);
  return new Promise((resolve, reject) => {
    db.sync().then(() => {
      director.update({ Director: values.Director }, { where: { id } }).then((data) => {
        resolve(data);
      }).catch((error) => { reject(error); });
    });
  });
}

function deleteDirector(id) {
  return new Promise((resolve, reject) => {
    db.sync().then(() => {
      director.destroy({ where: { id } }).then((data) => {
        resolve(data);
      }).catch((error) => { reject(error); });
    });
  });
}

module.exports = {
  // eslint-disable-next-line max-len
  getAllDirectors, getDirectorWithId, addNewDirector, deleteDirector, updateDirector, checkDirectorId,
};
