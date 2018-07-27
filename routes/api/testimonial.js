const express = require('express');
const router = express.Router();
const passport = require('passport');

const Testimonial = require('../../models/Testimonial');

//@route GET api/testimonial/test
//@desc Tests testimonial route
// @access Public
router.get('/test', (req, res) =>  res.json({msg: 'Testimonial Works'}));


// @route   GET api/testimonial
// @desc    Get all testimonials
// @access  Private
router.get('/', (req, res) => {
      const errors = {};

  Testimonial.find()
    .then(testimonials => res.json(testimonials))
    .catch(err => res.status(404).json({ notestimonialsfound: 'No testimonials found' }));
});
// @route   GET api/testimonial/id
// @desc    Get testimonials by ID
// @access  Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
  Testimonial.findById(req.params.id)
    .then(testimonial => res.json(testimonial))
    .catch(err =>
      res.status(404).json({ notestimonialfound: 'No testimonial found with that ID' })
    );
});

// @route   POST api/testimonial
// @desc    Create testimonial
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
    const newTestimonial = new Testimonial({
      date: req.body.date,
      name: req.body.name,
      content: req.body.content
    });
    newTestimonial.save().then(testimonial => res.json(testimonial));
    res.send('testimonial created sucessfully');
  }
);
// @route   DELETE api/testimonial
// @desc    Delete testimonial by ID
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
	Testimonial.findByIdAndRemove(req.params.id)
  .then(testimonial => res.json(testimonial))
  .catch(err =>
    res.status(404).json('Unable to delete testimonial')
  );
  
});
// @route   PATCH api/testimonial
// @desc    Update testimonial
// @access  Private
router.patch('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { const errors = {};

      Testimonial.update({_id: req.params.id}, {$set:{'name': req.body.name, 'date': req.body.date, 'content': req.body.content}}, (err, result) => {
        if(err) {
          throw err;
        }
        res.send('testimonial updated sucessfully');
      });
  });


module.exports = router;
