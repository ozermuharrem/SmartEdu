const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const path = require('path');
const pageRoute = require('./routers/pageRoute');
const courseRoute = require('./routers/coursRoute');
const categoryRoute = require('./routers/categoryRoute');
const userRoute = require('./routers/userRoute');



mongoose.connect('mongodb+srv://mozer-smartEdu:8ANquaTKnSYl7gJn@cluster0.hpez2i7.mongodb.net/smartEdu?retryWrites=true&w=majority')
.then(()=>{
    console.log('db connected')
})
.catch((err)=>{
    console.log(err)
})

const app = express();

// global veriable

global.userIN = null;


// midllewares

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(session({
  secret: 'my_keyboard_cat', // 
  resave: false, // herhangi bir değişikliok olmasa bile sessionu kaydediyor
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://mozer-smartEdu:8ANquaTKnSYl7gJn@cluster0.hpez2i7.mongodb.net/smartEdu?retryWrites=true&w=majority'})
}))

// templete engine
app.set("view engine", "ejs");


//routing


app.use('*', (req, res, next) =>{
    userIN = req.session.userID;
    next();
})

app.use('/', pageRoute )
app.use('/courses', courseRoute );
app.use('/categories', categoryRoute )
app.use('/users', userRoute )






const port = 3001;

app.listen(port, ()=>{
    console.log(`${port} port listen`);
})