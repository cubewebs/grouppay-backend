/*
    Route: /api/users
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users.controller');
const { validateFields } = require('../middlewares/validate-fields')

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('firstName', 'Your First Name is required').not().isEmpty(),
    check('lastName', 'Your Last Name is required').not().isEmpty(),
    check('email', 'Your email is required').isEmail(),
    check('password', 'You need a password for security reasons and is required').not().isEmpty(),
    validateFields,
], createUser);

router.put('/:id', [
    check('firstName', 'Your First Name is required').not().isEmpty(),
    check('lastName', 'Your Last Name is required').not().isEmpty(),
    check('email', 'Your email is required').isEmail(),
    check('role', 'The role is required').not().isEmpty(),

], updateUser);

router.delete('/:id', deleteUser);


module.exports = router;