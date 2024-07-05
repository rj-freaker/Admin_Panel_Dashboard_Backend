const mongooose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongooose.Schema({
    password: {
        type : String,
        required : true,
        minLength : 8
    },
    firstname : {
        type : String,
        required : true,
    },
    lastname : {
        type : String,
        required : true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    role: {
        type: String,
        enum : ['user','admin'],
        default : 'user'
    }
}, {timestamps: true});

userSchema.methods.comparePassword = async function(userpassword){
    try{
        const isMatch = await bcrypt.compare(userpassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

userSchema.pre('save', async function(next){
    const user = this;

    if(!user.isModified('password')) return next();
    
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        user.password = hashedPassword;

        next();
    }catch(err){
        return next(err);
    }
})


const User = mongooose.model('user',userSchema);

module.exports = User;