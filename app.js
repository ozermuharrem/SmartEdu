const express = require('express');
const ejs = require('ejs');
const app = express();
const path = require('path');



// midllewares
app.use(express.static('public'));

// templete engine
app.set("view engine", "ejs");

app.get('/', (req,res) => {
    res.status(200).render('index',{
        page_name : "index"
    });
})

app.get('/about', (req,res) => {
    res.status(200).render('about',{
        page_name : "about"
    });
})


const port = 3001;

app.listen(port, ()=>{
    console.log(`${port} port listen`);
})