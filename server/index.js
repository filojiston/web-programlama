const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
app.use(morgan('tiny'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const login = require('./routes/login');
const signUp = require('./routes/signUp');
const lifts = require('./routes/lifts');
const recipes = require('./routes/recipes');
const users = require('./routes/users');

app.use('/login', login);
app.use('/signup', signUp);
app.use('/lifts', lifts);
app.use('/recipes', recipes);
app.use('/users', users);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = parseInt(process.env.PORT, 10) || 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});