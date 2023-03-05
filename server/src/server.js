const http = require('http');
const app = require('./app');
require('dotenv').config();
const { readAllDataPromise } = require('./models/planets.model');
const {mongooseConnect} = require('./services/mongo')

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startSever(){
    await mongooseConnect();
    await readAllDataPromise;
    server.listen(PORT, ()=>{
        console.log('sever started...')
    });
}
startSever();







