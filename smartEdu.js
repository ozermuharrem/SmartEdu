const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override')
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');

const app = express();

//Connect DB
mongoose.connect('mongodb+srv://mozer:qUO5RqNVIOa46hGV@cluster0.fxuhwb7.mongodb.net/SmartEdu-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(()=> {
  console.log('DB Connected Successfully')
});

//Template Engine
app.set('view engine', 'ejs');

//Global Variable

global.userIN = null;


//Middlewares
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://mozer:qUO5RqNVIOa46hGV@cluster0.fxuhwb7.mongodb.net/SmartEdu-db?retryWrites=true&w=majority' })
}))
app.use(flash()); 
app.use((req,res,next)=>{
  res.locals.flashMessage = req.flash();
  next();
})
app.use(methodOverride('_method',{
  methods : [ 'POST', 'GET']
}))


//Routes
app.use('*', (req, res, next)=> {
  userIN = req.session.userID;
  next();
})
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = 5000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

