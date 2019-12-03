const Sequelize = require('sequelize');

const sequelize=require('../Database/connection')
const fs = require('fs');
const rawdata = fs.readFileSync('movies.json');
const movies = JSON.parse(rawdata);

const table = require('./creating_tables')

function NAremover(obj) {
  for (const k of Object.keys(obj)) {
    if (obj[k] === 'NA') {
      obj[k] = 0;
    }
  }
  return obj;
}




function insertDataJSONtoSql(obj) {
  sequelize.sync().then(function () {
    table.movie.create({
      Rank : obj.Rank,
      Title : obj.Title,
      Description :obj.Description,
      Runtime:obj.Runtime,
      Genre :obj.Genre,
      Rating :obj.Rating,
      Metascore :obj.Metascore,
      Votes : obj.Votes,
      Gross_Earning_in_Mil:obj.Gross_Earning_in_Mil,
      Director: obj.Director,
      Actor: obj.Actor,
      Year : obj.Year
    }).then(function (data) {
    console.log(data.values)
   })
  });
}


function enterDatainDirectors(id, obj) {

  sequelize.sync().then(function () {
    table.director.create({
      id : id,
      Director : obj.Director,
    }).then(function (data) {
      console.log(data.values)
     })
})
};

for (let i of movies) {
    if (Object.values(i).includes('NA')) {
      i = NAremover(i);
      insertDataJSONtoSql(i);
    } else {
      insertDataJSONtoSql(i);
    }
  }


  let count = 0;
  const director = {};
  for (const i of movies) {
    if (!director[i.Director]) {
      count += 1;
      enterDatainDirectors(count, i);
      director[i.Director] = 1;
    }
  }
