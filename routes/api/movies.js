const router = require('express').Router();
const Movie = require('../../models/movie');

/**
 * Return a list of all movies in the collection.
 */
router.get('/', (req, res, next) => {
  console.log('Get request for all movies');

  Movie.find({})
    .exec(function(err, movies) {
      if (err) {
        console.error('Error retrieving movies due to: ' + err);
      } else {
        res.json({ movies: movies });
      }
    });
});

/**
 * Insert a new movie.
 */
router.post('/', (req, res, next) => {
  console.log('Post a new movie');

  var newMovie = new Movie({
    title: req.body.title,
    url: req.body.url,
    description: req.body.description
  });

  newMovie.save((err, insertedMovie) => {
    if (err) {
      console.error('Error saving a new movie');
    } else {
      res.json(insertedMovie);
    }
  });
});

/**
 * Return a specific movie based on its ID.
 */
router.get('/:id', (req, res, next) => {
  console.log('Get movie with id: ' + req.params.id);

  Movie.findById(req.params.id)
    .exec((err, movie) => {
      if (err) {
        console.error('Error retrieving movie with id: ' + req.params.id);
      } else {
        res.json(movie);
      }
    })
});

/**
 * Update a specific movie based on its ID.
 */
router.put('/:id', (req, res, next) => {
  console.log('Update movie with id: ' + req.params.id);

  Movie.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      url: req.body.url,
      description: req.body.description
    }
  },
  {
    new: true
  },
  (err, updatedMovie) => {
    if (err) {
      res.send('Error update movie with id: ' + req.params.id);
    } else {
      res.json(updatedMovie);
    }
  })
});


router.delete('/:id', (req, res, next) => {
  console.log('Delete movie with id: ' + req.params.id);

  Movie.findByIdAndRemove(req.params.id, (err, deletedMovie) => {
    if (err) {
      res.send('Error deleting movie with id: ' + req.params.id);
    } else {
      res.json(deletedMovie);
    }
  });
});

module.exports = router;
