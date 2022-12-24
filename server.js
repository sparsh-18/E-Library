const express = require('express');
const configViewEngine = require("./configs/viewEngine");
var DBConnection = require("./configs/DBConnection");
const bodyParser = require("body-parser");
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
const upload = require('express-fileupload');
let app = express();
require('dotenv').config();
//use cookie parser
app.use(cookieParser('secret'));

var MySQLStore = require('express-mysql-session')(session);
var options = {
    host:'localhost',
    user:'root',
    password:"",
    database:"Online_Ebook_Learning"
};

var sessionStore = new MySQLStore(options);

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

configViewEngine(app);

app.use(flash());

app.use(upload());
// Enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    if(req.session.student != undefined && Object.keys(req.session.student).length !=0) {
        res.redirect('/student')
    } else if(req.session.teacher != undefined && Object.keys(req.session.teacher).length !=0) {
        res.redirect('/teacher')
    }
    else {
        res.render('frontPanel/home.ejs')
    }
});

app.get('/logout', (req, res) => {
    if(req.session.student != undefined && Object.keys(req.session.student).length !=0) {
        res.redirect('/student/logout')
    } else if(req.session.teacher != undefined && Object.keys(req.session.teacher).length !=0) {
        res.redirect('/teacher/logout')
    } else {
        res.redirect('/')
    }
});

var studentAuth = require("./routes/frontPanel/auth")
app.use('/student', studentAuth);

var studentPanel = require("./routes/frontPanel/studentPanel")
app.use('/student', studentPanel);

var studentProfile = require('./routes/frontPanel/studentProfile')
app.use('/student', studentProfile);



var teacherAuth = require('./routes/frontPanel/authTeacher')
app.use('/teacher', teacherAuth);

var teacherProfile = require('./routes/frontPanel/teacherProfile')
app.use('/teacher', teacherProfile);


var adminLogin = require('./routes/adminPanel/adminLogin')
app.use('/admin', adminLogin);

var adminPanel = require('./routes/adminPanel/adminPanel')
app.use('/admin', adminPanel);

app.listen(3000, () => console.log("server started"));