const Sequelize = require('sequelize');

const express = require('express');
const db = require('../Database/connection');

const app = express();
// const model = require('./Models/movies')

db.authenticate().then(() => console.log('db connected ')).catch((err) => console.log('error'));

const movie = db.define('Movies', {
  Rank: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Title: {
    type: Sequelize.STRING,
  },
  Description: {
    type: Sequelize.STRING,
  },
  Runtime: {
    type: Sequelize.INTEGER,
  },
  Genre: {
    type: Sequelize.STRING,
  },
  Rating: {
    type: Sequelize.FLOAT,
  },
  Metascore: {
    type: Sequelize.INTEGER,
  },
  Votes: {
    type: Sequelize.MEDIUMINT,
  },
  Gross_Earning_in_Mil: {
    type: Sequelize.FLOAT,
  },
  Director: {
    type: Sequelize.STRING,
  },
  Actor: {
    type: Sequelize.STRING,
  },
  Year: {
    type: Sequelize.INTEGER,
  },
}, { timestamps: false });


const director = db.define('Directors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Director: {
    type: Sequelize.STRING,
  },

}, { timestamps: false });


// defining the tables

app.get('/movies', (req, res) => {
  db.sync().then(() => {
    console.log('table made');
  }).then((mov) => {
    console.log(mov);
  }).catch((err) => console.log(`error :${err}`));
});
app.get('/directors', (req, res) => {
  db.sync({ force: true }).then(() => {
    res.send(director.findAll());
  }).catch((err) => {
    console.log(`error :${err}`);
  });
});

// app.listen(8001);
module.exports = {
  movie, director,
};
