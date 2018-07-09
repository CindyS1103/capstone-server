const express = require('express');
const router = express.Router();
const passport = require('passport');

const Provider = require('../../models/Provider');

//@route GET api/provider/test
//@desc Tests provider route
// @access Public
router.get('/test', (req, res) =>  res.json({msg: 'Provider Works'}));

// @route   GET api/provider/
// @desc    Get all providers
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const errors = {};

  Provider.find()
    .then(providers => res.json(providers))
    .catch(err => res.status(404).json({ noprovidersfound: 'No providers found' }));
});
// @route   GET api/provider/id
// @desc    Get provider by ID
// @access  Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
  Provider.findById(req.params.id)
    .then(provider => res.json(provider))
    .catch(err =>
      res.status(404).json({ noproviderfound: 'No provider found with that ID' })
    );
});

// @route   POST api/testimonial
// @desc    Create provider
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
    const newProvider = new Provider({
      date: req.body.date,
      name: req.body.name,
      age: req.body.age,
      provider_img: req.body.provider_img,
      vehicle: req.body.vehicle,
      notes: req.body.notes
    });
    newProvider.save().then(provider => res.json(provider));
    res.send('provider created sucessfully');
  }
);
// @route   DELETE api/provider
// @desc    Delete provider by ID
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
	Provider.findByIdAndRemove(req.params.id)
  .then(provider => res.json(provider))
  .catch(err =>
    res.status(404).json('Unable to delete provider')
  );
    res.send('provider deleted sucessfully');
});
// @route   PATCH api/provider/edit
// @desc    Update provider
// @access  Private
router.patch('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { const errors = {};

      Provider.update({_id: req.params.id}, {$set:{'name': req.body.name, 'date': req.body.date, 'vehicle': req.body.vehicle, 'age': req.body.vehicle, 'notes': req.body.notes, 'provider_img': req.body.provider_img}}, (err, result) => {
        if(err) {
          throw err;
        }
        res.send('provider updated sucessfully');
      });
  });


module.exports = router;
