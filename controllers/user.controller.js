const User = require('../models/user.models');

const {generateToken , jwtMiddleware} = require('../jwtAuth/jwt');

exports.signup = async (req,res) => {
    try{
        const userData = req.body;
        if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }
        const newUser = new User(userData);
        const response = await newUser.save();

        res.status(200).json({
            data: response,
            message: 'Signup successfull'
        })
    }
    catch(err){
        res.status(500).json({
            err: err.message,
            message:"some error occured during signup"
        });
    }
}

exports.signin = async (req,res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email: email});

        if(!user  || ! await user.comparePassword(password)){
            return res.status(400).json({
                message: 'email or password is incorrect'
            })
        }

        const payload = {
            id: user.id,
            role: user.role
        }

        const token = generateToken(payload);

        res.status(200).json({
            message: 'Signin successful',
            token: token
        })
    }
    catch(err){
        res.status(500).json({
            err: err.message,
            message:"some error occured during signin"
        });
    }
}

