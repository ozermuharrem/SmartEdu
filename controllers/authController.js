const bcrypt = require('bcrypt');
const User = require('../models/User');


exports.createUser = async (req, res) => {
    try{
       const user = await User.create(req.body);

        res.status(201).json({
            status : 'başarılı',
            user
        })
    } catch (error) {
        res.status(400).json({
            status : 'fail',
            error,
        });
    };
};

exports.loginUser = async (req, res) => {
    try{
        const {email , password} = req.body;
        await User.findOne({email}, (err , user) => {
            if(user) {
                bcrypt.compare(password, user.password , (err , same) => {
                    if(same)
                    // user session
                        res.status(200).send('login oldunuz');
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            status : 'fail',
            error,
        });
    };
};