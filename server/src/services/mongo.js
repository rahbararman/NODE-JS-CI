const mongoose = require('mongoose');
const MongoDB_URL = 'mongodb+srv://rahbararman:QnOE701HlWYztA4R@armanlearn.xruh8nd.mongodb.net/?retryWrites=true&w=majority'

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










