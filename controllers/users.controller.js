const { response } = require('express');
const { validationResult } = require('express-validator');
const User = require('../models/user.model');

const getUsers = async(req, res) => {

    const users = await User.find({}, 'firstName lastName email password');

    res.json({
        ok: true,
        users
    })
}

const createUser = async(req, res = response) => {

    const { firstName, lastName, email, password } = req.body;

    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    try {
        const emailExists = await User.findOne({ email });
        if( emailExists ) {
            return res.status(400).json({
                ok: false,
                msg: 'That email is already registered'
            })
        }
        const user = new User( req.body );
        await user.save();
        res.json({
            ok: true,
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error... check logs'
        });
    }

}

module.exports = {
    getUsers,
    createUser
}