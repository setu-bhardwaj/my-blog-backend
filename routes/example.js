const express = require('express');  //importing express js
const app = express(); //craeting instance


let setRouter = (app) =>{

    let helloWorld = (req,res)=> res.send('Hello World!!');

   let printexample = (req,res) => res.send('printExample'); 
    app.get('/hello-world',helloWorld);

    app.get('/example',printexample);
}//end set Router

module.exports = {
    setRouter:setRouter
}