const mongoose = require('mongoose'); 
require('dotenv').config();
mongoose.connect(process.env.MONGODB_CNN);
console.log(process.env.MONGODB_CNN);
const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('DB esta conectada correctamente');
});