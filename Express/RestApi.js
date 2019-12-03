const express = require('express');
// const body = require('body-parser')
const app = express();

const movieModel = require('../Models/movies');
const directorModel = require('../Models/director');

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: false })); // support encoded bodies
// app.use(body.json());

app.get('/api/movies', (req, res) => {
  movieModel.getAllMovies().then((returnAllMovies) => {
    // console.log(result);
    res.status(200).send(returnAllMovies);
  });
});

app.get('/api/movies/:movieId', (req, res) => {
  movieModel.getMovieWithId(req.params.movieId).then((returnMovieById) => {
    // console.log(result);
    if (returnMovieById.length === 0) {
      res.sendStatus(400);
    } else {
      res.status(200).send(returnMovieById);
    }
  }).catch((error) => {
    console.log(error);
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
    res.status(201).send(`Movie added successfully at ${id} Status Code:${res.statusCode}`);
  }).catch((error) => {
    console.log(error);
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
  if (id === '' || id === ' ') {
    res.status(400).send(' Bad request enter a correct Id');
  } else {
    movieModel.checkMovieId(id).then((data) => {
      console.log(data);
      if (data === true) {
        movieModel.updateMovies(id, values).then((returnedUpdatedMovie) => {
          console.log(returnedUpdatedMovie);
          res.status(202).send(`Movie ${values.Title} updated successfully at ${id} Status Code:${res.statusCode}`);
        });
      } else {
        res.status(400).send(' Bad request id not present');
      }
    }).catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
  }
});


app.delete('/api/movies/:movieId', (req, res) => {
  const id = req.params.movieId;
  movieModel.checkMovieId(id).then((data) => {
    console.log(data);
    if (data === true) {
      movieModel.deleteMovie(req.params.movieId).then((deletedMovie) => {
        console.log(deletedMovie);
        res.status(410).send(`Movie deleted at ${id} Status Code:${res.statusCode}`);
      }).catch((error) => {
        console.log(error);
        res.sendStatus(404);
      });
    } else {
      res.status(400).send(`id ${id} does not exists  Status Code:${res.statusCode}`);
    }
  });
});

//------------------------------------------------------------------------------


app.get('/api/directors', (req, res) => {
  directorModel.getAllDirectors().then((returnAllDirectors) => {
    // console.log(result);
    res.status(200).send(returnAllDirectors);
  });
});

app.get('/api/directors/:directorId', (req, res) => {
  directorModel.getDirectorWithId(req.params.directorId).then((returnDirectorById) => {
    // console.log(result);
    if (returnDirectorById.length === 0) {
      res.sendStatus(400);
    } else {
      res.status(200).send(returnDirectorById);
    }
  }).catch((error) => {
    console.log(error);
    res.sendStatus(404);
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
  }).catch((error) => {
    console.log(error);
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
  if (id === '' || id === ' ') {
    res.status(400).send(' Bad request enter a correct Id');
  } else {
    directorModel.checkDirectorId(id).then((data) => {
      // console.log(data);
      if (data === true) {
        directorModel.updateDirector(id, values).then((returnedUpdatedDirector) => {
          console.log(returnedUpdatedDirector);
          res.status(202).send(`Director ${values.Director} updated successfully at ${id} Status Code:${res.statusCode}`);
        });
      } else {
        res.status(400).send(' Bad request id not present');
      }
    }).catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
  }
});

app.delete('/api/directors/:directorId', (req, res) => {
  const id = req.params.directorId;
  directorModel.checkDirectorId(id).then((data) => {
    // console.log(data);
    if (data === true) {
      directorModel.deleteDirector(id).then((deletedDirector) => {
        res.status(410).send(`Director deleted at ${id} Status Code:${res.statusCode}`);
      }).catch((error) => {
        console.log(error);
        res.sendStatus(404);
      });
    } else {
      res.status(400).send(`id ${id} does not exists  Status Code:${res.statusCode}`);
    }
  });
});


app.listen(8081);
