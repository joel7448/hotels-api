const express = require('express');
const getDetails = require('./controller/getDetails');
const cors = require('cors');
require('dotenv').config();
const app = express();
const host = '0.0.0.0';
process.env.PUPPETEER_DOWNLOAD_PATH = '/opt/render/.cache/puppeteer';

app.use(cors({
    origin : '*'
}))
app.use(express.json());

app.get('/',getDetails);
app.get('/:id',getDetails);

app.listen( process.env.PORT || 8000 ,host, ()=>console.log('server runing...') );