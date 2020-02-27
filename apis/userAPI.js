const express = require('express')
const router = express.Router();

const ctrlUsers = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUsers.register);
router.post('/authenticate', ctrlUsers.authenticate);
router.get('/profile', jwtHelper.verifyJWTToken, ctrlUsers.profile);


module.exports = router;