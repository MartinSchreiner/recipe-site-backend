require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');

const userAPI = require('./apis/userAPI');
const recipeAPI = require('./apis/recipeAPI')

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/userAPI', userAPI);
app.use('/recipeAPI', recipeAPI);

app.use('/', (req, res) => {res.send("welcome to the site");});
app.listen(process.env.PORT);