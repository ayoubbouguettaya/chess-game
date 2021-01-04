const express = require('express');
const router = express.Router();

const gamesRouter = require('./helpers/games');
const usersRouter = require('./helpers/users');

router.get('/games/', gamesRouter);
router.get('/users/', gamesRouter);

module.exports = router;
