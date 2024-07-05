const mongoose = require('mongoose');

const url = process.env.DEV_DB;
const dbName = process.env.DB_NAME;

const connectDb = async () => {
    try{
        const db = await mongoose.connect(`${url}/${dbName}`);
        console.log(`database ${db.STATES['1']}`);
    }
    catch(err){
        console.log('Some error ooccured while connecting to database');
        console.log(err.message);
    }
}

module.exports = connectDb;