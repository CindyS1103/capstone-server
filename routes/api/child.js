const express = require('express');
const router = express.Router();
const passport = require('passport');

const Child = require('../../models/Child');

//@route GET api/child/test
//@desc Tests child route
// @access Public
router.get('/test', (req, res) =>  res.json({msg: 'Child Works'}));

// @route   GET api/child
// @desc    Get all childs
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const errors = {};

  Child.find()
    .then(childs => res.json(childs))
    .catch(err => res.status(404).json({ nochildfound: 'No child found' }));
});
// @route   GET api/child/id
// @desc    Get child by ID
// @access  Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
  Child.findById(req.params.id)
    .then(child => res.json(child))
    .catch(err =>
      res.status(404).json({ nochildfound: 'No child found with that ID' })
    );
});

// @route   POST api/child
// @desc    Create child
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
    const newChild = new Child({
      date: req.body.date,
      child_name: req.body.child_name,
      age: req.body.age,
      birthdate: req.body.birthdate,
      child_img: req.body.child_img,
      address: req.body.address,
      notes: req.body.notes,
      parent_name: req.body.parent_name

    });
    newChild.save().then(child => res.json(child));
    res.send('child created sucessfully');
  }

);
// @route   DELETE api/child
// @desc    Delete child by ID
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
	Child.findByIdAndRemove(req.params.id)
  .then(child => res.json(child))
  .catch(err =>
    res.status(404).json('Unable to delete child')
  );

});
// @route   PATCH api/child/edit
// @desc    Update child
// @access  Private
router.patch('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { const errors = {};

      Child.update({_id: req.params.id}, {$set:{'child_name': req.body.child_name, 'date': req.body.date, 'age': req.body.age, 'birthdate': req.body.birthdate, 'child_img': req.body.child_img, 'parent_name': req.body.parent_name, 'notes': req.body.notes}}, (err, result) => {
        if(err) {
          throw err;
        }
        res.send('child updated sucessfully');
      });
  });


module.exports = router;
