/*
    Route: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser } = require('../controllers/users.controller')

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('firstName', 'Your First Name is required').not().isEmpty(),
    check('lastName', 'Your Last Name is required').not().isEmpty(),
    check('email', 'Your email is required').isEmail(),
    check('password', 'You need a password for security reasons and is required').not().isEmpty(),
],
createUser);




module.exports = router;