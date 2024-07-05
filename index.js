const express = require('express');
require('dotenv').config();
const db = require('./db/connectDb.db');
const PORT = process.env.DEV_PORT;
const cors = require('cors');
const bodyparser = require('body-parser')
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const app = express();
db();
app.use(bodyparser.json());
app.use(cors());


app.use('/api', userRoutes);
app.use('/api', adminRoutes);

app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
})