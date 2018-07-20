const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');

const user = require('./routes/api/user');
const testimonial = require('./routes/api/testimonial');
const provider = require('./routes/api/provider');
const message = require('./routes/api/message');
const child = require('./routes/api/child');
const calendar = require('./routes/api/calendar');
const activities = require('./routes/api/activities');
const cors = require('cors');


const app = express();
app.use(cors());

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to mongodb
mongoose
.connect(db)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use(passport.initialize());

require('./config/passport')(passport);

//enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


//Use routes
app.use('/api/user', user);
app.use('/api/testimonial', testimonial);
app.use('/api/provider', provider);
app.use('/api/message', message);
app.use('/api/child', child);
app.use('/api/calendar', calendar);
app.use('/api/activities', activities);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log('listening on port ' + port)
 })
