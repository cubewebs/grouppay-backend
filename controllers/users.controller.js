const { response } = require('express');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const getUsers = async(req, res) => {

    const users = await User.find({}, 'firstName lastName email password');

    res.json({
        ok: true,
        users
    })
}

const createUser = async(req, res = response) => {

    const { firstName, lastName, email, password } = req.body;

    try {

        const emailExists = await User.findOne({ email });

        if( emailExists ) {
            return res.status(400).json({
                ok: false,
                msg: 'That email is already registered'
            })
        }

        const user = new User( req.body );

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        // Save user
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

const updateUser = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );

        if(!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No user matches that id'
            })
        }

        // Updatees
        const { password, google, email, ...fields } = req.body;

        if( userDB.email !== email) {
            
            const emailExists = await User.findOne({email});
            if( emailExists ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'A user with that email already exists'
                });
            }
        }

        fields.email = email;

        // TODO: validate if user is correct
        
        const updatedUser = await User.findByIdAndUpdate( uid, fields, {new: true} );

        res.json({
            ok: true,
            user: updatedUser
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        });

    }
}

const deleteUser = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const userDB = await User.findById( uid );
        console.log(userDB)

        if(!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No user matches that id'
            })
        }

        await User.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'User has been deleted successfully'
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Unexpected Error'
        });

    }

}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}