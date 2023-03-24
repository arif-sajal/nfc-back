// process.env.UV_THREADPOOL_SIZE = 5;

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const router = require('./routes/authroute');

const { mongouri } = require('./config/keys')
app.use(cors())
app.use(express.json());



// app.get('/.well-known/assetlinks.json', function(req, res) {
//     res.sendFile(__dirname + '/.well-known/assetlinks.json');
//   });

app.get('/', (req, res) => {
    res.send('got it')
})

mongoose.connect('mongodb+srv://bbazaar:sajals70@bbazaar.uawcu.mongodb.net/nfc', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then((result) => {
    console.log('mongo connected');
}).catch(console.log);

app.use(router)

app.listen(8000, () => { console.log(`server run at http://localhost:8000`) })
// if(process.env.NODE_ENV=='production'){
//   app.use(express.static('client/build'))
//   const path=require('path')
//   app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'client','build','index.html'))
//   })
// }