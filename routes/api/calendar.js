const express = require('express');
const router = express.Router();
const passport = require('passport');

const Calendar = require('../../models/Calendar');

//@route GET api/calendar/test
//@desc Tests calendar route
// @access Public
router.get('/test', (req, res) =>  res.json({msg: 'Calendar Works'}));

// @route   GET api/calendar
// @desc    Get all calendars
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const errors = {};

  Calendar.find()
    .then(calendars => res.json(calendars))
    .catch(err => res.status(404).json({ nocalendarfound: 'No calendar found' }));
});
// @route   GET api/calendar/id
// @desc    Get calendar by ID
// @access  Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
  Calendar.findById(req.params.id)
    .then(calendar => res.json(calendar))
    .catch(err =>
      res.status(404).json({ nocalendarfound: 'No calendar found with that ID' })
    );
});

// @route   POST api/calendar
// @desc    Create calendar
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};

    console.log(req.user);
    const newCalendar = new Calendar({
      date: req.body.date,
      event_name: req.body.event_name,
      assigned_child: req.body.assigned_child,
      child_img: req.body.child_img,
      child_age: req.body.child_age,
      pickup_address: req.body.pickup_address,
      parent_name: req.body.parent_name,
      hours_type: req.body.hours_type,
      hours: req.body.hours,
      pickup_time: req.body.pickup_time,
      activities_location: req.body.activities_location,
      activities_start: req.body.activities_start,
      activities_end: req.body.activities_end,
      user:req.user,
      notes: req.body.notes

    });
    newCalendar.save().then(calendar => res.json(calendar));
    res.send('calendar created sucessfully');
  }

);
// @route   DELETE api/calendar
// @desc    Delete calendar by ID
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
	Calendar.findByIdAndRemove(req.params.id)
  .then(calendar => res.json(calendar))
  .catch(err =>
    res.status(404).json('Unable to delete calendar')
  );
  
});
// @route   PATCH api/calendar/edit
// @desc    Update calendar
// @access  Private
router.patch('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
      const errors = {};

      Calendar.update({_id: req.params.id}, {$set:{'date': req.body.date, 'assigned_child': req.body.assigned_child, 'child_img': req.body.child_img, 'child_img': req.body.child_img, 'child_age': req.body.child_age, 'pickup_address': req.body.pickup_address, 'parent_name': req.body.parent_name, 'hours_type': req.body.hours_type, 'hours': req.body.hours, 'pickup_time': req.body.pickup_time, 'event_name': req.body.event_name,
      'activities_location': req.body.activities_location,
      'activities_start': req.body.activities_start,
      'activities_end': req.body.activities_end, 'notes': req.body.notes}}, (err, result) => {
        if(err) {
          throw err;
        }
        res.send('calendar updated sucessfully');
      });
  });



module.exports = router;
