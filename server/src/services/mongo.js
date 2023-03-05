const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const MongoDB_URL = process.env.MongoDB_URL;

mongoose.connection.once('open', ()=>{
    console.log('Mongo DB connection is ready!')
})

mongoose.connection.on('error', (err)=>{
    console.error(err);
})

async function mongooseConnect(){
    await mongoose.connect(MongoDB_URL);
}

async function mongooseDisconnect(){
    await mongoose.disconnect();
}

module.exports = {
    mongooseConnect: mongooseConnect,
    mongooseDisconnect: mongooseDisconnect
}










