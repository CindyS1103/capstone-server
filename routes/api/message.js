const express = require('express');
const router = express.Router();
const passport = require('passport');

const Message = require('../../models/Message');

//@route GET api/message/test
//@desc Tests message route
// @access Public
router.get('/test', (req, res) =>  res.json({msg: 'Message Works'}));

// @route   GET api/message
// @desc    Get all messages
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }),
    (req, res) => {
      const errors = {};

  Message.find()
    .then(messages => res.json(messages))
    .catch(err => res.status(404).json({ nomessagesfound: 'No messages found' }));
});
// @route   GET api/message/id
// @desc    Get message by ID
// @access  Private
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
  Message.findById(req.params.id)
    .then(message => res.json(message))
    .catch(err =>
      res.status(404).json({ nomessagefound: 'No message found with that ID' })
    );
});

// @route   POST api/message
// @desc    Create message
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
    const newMessage = new Message({
      date: req.body.date,
      body: req.body.body,
      subject: req.body.subject,
      recipient: req.body.recipient,
      sender: req.body.sender,
      reply: req.body.reply
    });
    newMessage.save().then(message => res.json(message));
    res.send('message created sucessfully');
  }

);
// @route   DELETE api/message
// @desc    Delete message by ID
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => { const errors = {};
	Message.findByIdAndRemove(req.params.id)
  .then(message => res.json(message))
  .catch(err =>
    res.status(404).json('Unable to delete message')
  );

});
// @route   PATCH api/message/edit
// @desc    Update message
// @access  Private
router.patch('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => { const errors = {};

      Message.update({_id: req.params.id}, {$set:{'body': req.body.body, 'date': req.body.date, 'recipient': req.body.recipient, 'sender': req.body.sender, 'subject': req.body.subject, 'reply': req.body.reply}}, (err, result) => {
        if(err) {
          throw err;
        }
        res.send('message updated sucessfully');
      });
  });


module.exports = router;
