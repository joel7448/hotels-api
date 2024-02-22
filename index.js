const express = require('express');
const getDetails = require('./controller/getDetails');
require('dotenv').config();
const app = express();
// const host = '0.0.0.0';

process.env.PUPPETEER_DOWNLOAD_PATH = '/opt/render/.cache/puppeteer';
console.log(process.env.BASE_URL)

app.use(express.json());

app.get('/',getDetails);
app.get('/:id',getDetails);

app.listen( process.env.PORT || 8000 , ()=>console.log('server runing...') );