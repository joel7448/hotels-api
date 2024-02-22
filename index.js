const express = require('express');
const getDetails = require('./controller/getDetails');
const app = express();

app.use(express.json());

app.get('/',getDetails);
app.get('/:id',getDetails);

app.listen( process.env.PORT || 8000 ,()=>console.log('server runing...') );