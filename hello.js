const express = require('express');  //importing express js
const app = express(); //craeting instance

app.get('/',(req,res)=> res.send('Hello World'));

let helloWorld = (req,res)=> res.send('Hello World!!');
//app.get('/',helloWorld);
app.get('/home',helloWorld);

app.listen(3000,()=> console.log('example app listening on port 3000'));
