const express = require('express');
const { getOne, getAll } = require('../controllers/user.controller');

const authRoute = express.Router();

authRoute.get('/', getAll)
authRoute.get('/:id', getOne)

module.exports = authRoute;