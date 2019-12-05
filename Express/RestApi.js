const express = require('express');
// const body = require('body-parser')
const app = express();

const movieModel = require('../Models/movies');
const directorModel = require('../Models/director');

const { logger } = require('../Logging/winston');

logger.info('server started');

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: false })); // support encoded bodies
// app.use(body.json());

app.get('/api/movies', (req, res) => {
  logger.info(req.ip);
  movieModel.getAllMovies().then((returnAllMovies) => {
    // console.log(returnAllMovies);
    res.status(200).send(returnAllMovies);
    logger.info('result generated');
  });
});

app.get('/api/movies/:movieId', (req, res) => {
  movieModel.getMovieWithId(req.params.movieId).then((returnMovieById) => {
    // console.log(returnMovieById.dataValues);
    movieModel.checkMovieId(req.params.movieId).then((data) => {
      // console.log(data);
      if (data === false) {
        logger.info('movie not present');
        res.sendStatus(400);
      } else {
        logger.info(`${req.ip} result generated request processed successfully`);
        res.status(200).send(returnMovieById);
      }
    });
  }).catch((error) => {
    logger.error(error);
    res.sendStatus(404);
  });
});

app.post('/api/movies/', (req, res) => {
  const { body } = req;
  const newMovie = {
    Title: body.title,
    Description: body.desc,
    Runtime: body.runtime,
    Genre: body.genre,
    Rate: body.rate,
    Metascore: body.metascore,
    Votes: body.votes,
    Gross: body.gross,
    Dir: body.dir,
    Actor: body.actor,
    Year: body.year,
  };
  movieModel.addNewMovie(newMovie).then((returnnewMovie) => {
    // console.log(returnnewMovie.dataValues.Rank)
    const id = (returnnewMovie.dataValues.Rank);
    logger.info(`${req.ip} data added request processed successfully`);
    res.status(201).send(`Movie added successfully at ${id} Status Code:${res.statusCode}`);
  }).catch((error) => {
    logger.error(error);
    res.statusCode(404);
  });
});

app.put('/api/movies/:movieId', (req, res) => {
  const id = req.params.movieId;
  const { body } = req;
  const values = {
    Title: body.title,
    Description: body.desc,
    Runtime: body.runtime,
    Genre: body.genre,
    Rate: body.rate,
    Metascore: body.metascore,
    Votes: body.votes,
    Gross: body.gross,
    Dir: body.dir,
    Actor: body.actor,
    Year: body.year,
  };
  console.log(values);
  movieModel.checkMovieId(id).then((data) => {
    console.log(data);
    if (data === true) {
      movieModel.updateMovies(id, values).then(() => {
        res.status(202).send(`Movie updated successfully at ${id} Status Code:${res.statusCode}`);
        logger.info(`${req.ip} data updated request processed successfully`);
      });
    } else {
      logger.info('movie not present');
      res.status(400).send(' Bad request id not present');
    }
  }).catch((error) => {
    logger.error(error);
    res.sendStatus(404);
  });
});


app.delete('/api/movies/:movieId', (req, res) => {
  const id = req.params.movieId;
  movieModel.checkMovieId(id).then((data) => {
    // console.log(data);
    if (data === true) {
      movieModel.deleteMovie(req.params.movieId).then((deletedMovie) => {
        console.log(deletedMovie);
        res.status(410).send(`Movie deleted at ${id} Status Code:${res.statusCode}`);
        logger.info(`${req.ip} data deleted request processed successfully`);
      }).catch((error) => {
        logger.error(error);
        res.sendStatus(404);
      });
    } else {
      res.status(400).send(`id ${id} does not exists  Status Code:${res.statusCode}`);
    }
  });
});

//------------------------------------------------------------------------------


app.get('/api/directors', (req, res) => {
  logger.info(req.ip);
  directorModel.getAllDirectors().then((returnAllDirectors) => {
    // console.log(result);
    res.status(200).send(returnAllDirectors);
    logger.info('result generated');
  });
});

app.get('/api/directors/:directorId', (req, res) => {
  directorModel.getDirectorWithId(req.params.directorId).then((returnDirectorById) => {
    // console.log(result);
    directorModel.checkDirectorId(req.params.directorId).then((data) => {
      // console.log(data);
      if (data === false) {
        logger.info(' director not present');
        res.sendStatus(400);
      } else {
        res.status(200).send(returnDirectorById);
        logger.info(`${req.ip} result generated request processed successfully`);
      }
    }).catch((error) => {
      logger.error(error);
      res.sendStatus(404);
    });
  });
});


app.post('/api/directors/', (req, res) => {
  const { body } = req;
  const newDirector = {
    Director: body.Director,
  };
  directorModel.addNewDirector(newDirector).then((returnnewDirector) => {
    const { id } = returnnewDirector.dataValues;
    res.status(201).send(`Director added successfully at ${id} Status Code:${res.statusCode}`);
    logger.info(`${req.ip} data added request processed successfully`);
  }).catch((error) => {
    logger.error(error);
    res.statusCode(404);
  });
});

app.put('/api/directors/:directorId', (req, res) => {
  const id = req.params.directorId;
  const { body } = req;
  const values = {
    Director: body.Director,
  };
  // console.log(`${id  } ${ values.Director}`);
  directorModel.checkDirectorId(id).then((data) => {
    // console.log(data);
    if (data === true) {
      directorModel.updateDirector(id, values).then((returnedUpdatedDirector) => {
        console.log(returnedUpdatedDirector);
        res.status(202).send(`Director ${values.Director} updated successfully at ${id} Status Code:${res.statusCode}`);
        logger.info(`${req.ip} data updated request processed successfully`);
      });
    } else {
      res.status(400).send(' Bad request id not present');
      logger.info('data not present');
    }
  }).catch((error) => {
    logger.error(error);
    res.sendStatus(404);
  });
});

app.delete('/api/directors/:directorId', (req, res) => {
  const id = req.params.directorId;
  directorModel.checkDirectorId(id).then((data) => {
    // console.log(data);
    if (data === true) {
      directorModel.deleteDirector(id).then(() => {
        res.status(410).send(`Director deleted at ${id} Status Code:${res.statusCode}`);
        logger.info(`${req.ip} data deleted request processed successfully`);
      }).catch((error) => {
        logger.error(error);
        res.sendStatus(404);
      });
    } else {
      res.status(400).send(`id ${id} does not exists  Status Code:${res.statusCode}`);
      logger.info('data not present');
    }
  });
});


app.listen(8081);
