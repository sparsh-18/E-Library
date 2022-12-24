const express = require('express');
var router = express.Router();


router.get('/login', (req, res) => {
    if(req.session.admin != undefined && Object.keys(req.session.admin).length > 0) {
        res.redirect('/admin')
    }
    else
        res.render('adminPanel/adminLogin.ejs')
})


router.post('/login', (req, res) => {
    if(req.session.admin != undefined && Object.keys(req.session.admin).length > 0) {
        res.redirect('/admin/login')
    }
    else {
        var email = req.body.email;
        var pass = req.body.password;

        if(email === process.env.EMAIL && pass === process.env.PASS) {
            req.session.admin = {'user': 'root'}
        } 
        res.redirect('/admin/login')
    }
})

router.get('/logout', (req, res) => {
    if(req.session.admin != undefined && Object.keys(req.session.admin).length > 0) {
        req.session.admin = {};
        res.redirect('/admin/login')
    }
})

module.exports = router;