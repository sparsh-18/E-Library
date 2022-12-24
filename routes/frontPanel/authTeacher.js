const express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var mysql = require('mysql');
var con = require("../../configs/DBConnection");

const nodemailer = require('nodemailer');

router.get("/login", function(req, res) {
   // console.log(req.session.teacher);
    if(req.session.teacher != undefined && Object.keys(req.session.teacher).length !=0)
        res.redirect('/teacher')
    else
        res.render("frontPanel/teacherLogin.ejs");
});

router.post("/login", (req, res) => {

    var email = req.body.email;
    var pass = req.body.password;

    // console.log(email, pass);

    con.query('SELECT * FROM teacher WHERE email = ?', [email], (er, result) => {
        if(er) throw er;
        if(result.length === 0) {
            req.flash('err', 'Email not found');
            // console.log("here");
            res.redirect("/teacher/login");
        }
        else {
           // console.log("here2");
            bcrypt.compare(pass, result[0].password, function(err, resp) {
                if(err) throw err;
                if(resp)
                req.session.teacher = {id: result[0].id};
                
               // console.log("here3");
                res.redirect("/teacher");
            });
        }
    })

})

router.get("/register", (req, res) => {
    if(req.session.teacher != undefined && Object.keys(req.session.teacher).length !=0)
        res.redirect('/teacher')
    else
        res.render("frontPanel/teacherRegister.ejs")
})

router.post("/register", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var dept = req.body.dept;

    con.query('SELECT * FROM teacher WHERE email = ?', [email], (er, result) => {
        if(er) throw er;
        if(result.length > 0) {
            req.flash('err', "Email exists!");
            res.redirect("/teacher/register")
        }
        else{

            var pass = req.body.password;
            let salt =  bcrypt.genSaltSync(10);
            var newpassword =  bcrypt.hashSync(pass, salt);

            var insertquery = "INSERT INTO teacher (name, email, password, dept) VALUES (?,?,?,?)";
            var query = mysql.format(insertquery,[name, email,newpassword, dept]);

            con.query(query, function (err, result) {
                if (err) throw err;

                console.log("1 record inserted");
                res.redirect("/teacher/login");
            });
        }
    })

})



router.get('/forgotpassword',  (req, res) => {


    if(req.session.teacher != undefined && Object.keys(req.session.teacher).length !=0)
        res.redirect('/teacher')
    else
        res.render("frontPanel/teacherForgotPassword.ejs")
     
    
})

router.post('/resetpassword', (req, res) => {
    var email = req.body.email;

    new Promise((resolve, reject) => {
        con.query('SELECT email FROM teacher WHERE email = ?', [email], (er, result) => {
            if(er) throw er;
            if(result.length > 0) resolve(true)
            else resolve(false);
        })
    }).then(found => {
        if(found) {
            
                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host: "smtp.gmail.com",
                    
                    auth: {
                        user: process.env.OUTMAIL,
                        pass: process.env.OUTAPPPASS,
                    } 
                  });
            
            
                  let mailOptions = {
                    from: "srivastavasatyarth1@gmail.com",
                    to: email,
                    subject: 'Password reset',
                    text: 'Hello',
                    html: '<p>The password reset link is http://localhost:3000/teacher/forgotpassword/'+email+'"></p>',
            
                  };
                  
                  transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                      console.log(err);
                    } else {
                        req.flash('err', 'Password reset Email sent')
                        res.redirect('/teacher')
                    }
                  });

        }
        else {
            req.flash('err', 'Email not found')
            res.redirect('/teacher')
        }
    })
    
})


router.get('/forgotpassword/:email', (req, res) => {

    if(req.session.teacher != undefined && Object.keys(req.session.teacher).length !=0)
        res.redirect('/teacher')
    else
        res.render("frontPanel/teacherNewPassword.ejs", {email: req.params.email})
}) 

router.post('/resetpassword/:email', (req, res) => {
    var pass = req.body.pass;
    let salt =  bcrypt.genSaltSync(10);
    var newpassword =  bcrypt.hashSync(pass, salt);

    var insertquery = "UPDATE teacher SET password = ? WHERE email = ?";
    var query = mysql.format(insertquery,[newpassword, req.params.email]);

    con.query(query, function (err, result) {
        if (err) throw err;

        req.flash('err', 'password changed')
        res.redirect("/teacher/login");
    });

}) 

router.get('/logout', (req, res) => {
    req.session.teacher = {};
    res.redirect('/teacher/login');
})

module.exports = router;