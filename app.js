const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const path = require('path');
const pageRoute = require('./routers/pageRoute');
const courseRoute = require('./routers/coursRoute');

mongoose.connect('mongodb+srv://mozer-smartEdu:8ANquaTKnSYl7gJn@cluster0.hpez2i7.mongodb.net/smartEdu?retryWrites=true&w=majority')
.then(()=>{
    console.log('db connected')
})
.catch((err)=>{
    console.log(err)
})

const app = express();




// midllewares
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// templete engine
app.set("view engine", "ejs");

app.use('/', pageRoute )
app.use('/courses', courseRoute )




const port = 3001;

app.listen(port, ()=>{
    console.log(`${port} port listen`);
})