const express = require('express');
const getDetails = require('./controller/getDetails');
require('dotenv').require();
const app = express();
process.env.PUPPETEER_DOWNLOAD_PATH = '/opt/render/.cache/puppeteer';
app.use(express.json());

app.get('/',getDetails);
app.get('/:id',getDetails);

app.listen( process.env.PORT || 8000 ,()=>console.log('server runing...') );