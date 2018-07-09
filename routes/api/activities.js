const express = require('express');
const router = express.Router();
const passport = require('passport');

const Activities = require('../../models/Activities');



// @route   GET api/activities
// @desc    Get all activities
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const errors = {};

  Activities.find()
    .then(activities => res.json(activities))
    .catch(err => res.status(404).json({ noactivitiesfound: 'No activities found' }));
});
// @route   GET api/activities/id
// @desc    Get activities by ID
// @access  Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
  Activities.findById(req.params.id)
    .then(activities => res.json(activities))
    .catch(err =>
      res.status(404).json({ noactivitiesfound: 'No activities found with that ID' })
    );
});

// @route   POST api/activities
// @desc    Create activities
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
    const newActivities = new Activities({
      date: req.body.date,
      activity_name: req.body.activity_name,
      activity_description: req.body.activity_description,
      activity_location: req.body.activity_location,
      activity_time: req.body.activity_time
    });
    newActivities.save().then(activity => res.json(activity));
    res.send('activity created sucessfully');
  }
);
// @route   DELETE api/activity
// @desc    Delete activity by ID
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
	Activities.findByIdAndRemove(req.params.id)
  .then(activity => res.json(activity))
  .catch(err =>
    res.status(404).json('Unable to delete activity')
  );
  res.send('activity deleted sucessfully');
});
// @route   PATCH api/activity
// @desc    Update activity
// @access  Private
router.patch('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { const errors = {};

      Activities.update({_id: req.params.id}, {$set:{'activity_name': req.body.activity_name, 'date': req.body.date, 'activity_description': req.body.activity_description, 'activity_location': req.body.activity_location, 'activity_time': req.body.activity_time}}, (err, result) => {
        if(err) {
          throw err;
        }
        res.send('activity updated sucessfully');
      });
  });


module.exports = router;
