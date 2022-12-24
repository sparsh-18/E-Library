const express = require('express');
var router = express.Router();
var con = require("../../configs/DBConnection");

router.get('/', (req, res) => {
    if(req.session.admin != undefined && Object.keys(req.session.admin).length > 0) {
        
        new Promise((resolve, reject) => {
            var query = 'SELECT books.id, books.name, books.author, teacher.name AS teacher_name FROM books LEFT JOIN teacher ON books.teacher_id = teacher.id WHERE books.isApproved = 1;'
            con.query(query, (err, resp) => {
                if(err) reject(err)
                resolve(resp)
            })
        }).then((resp) => {
            console.log(resp);
            res.render('adminPanel/allbooks.ejs', {resp: resp})
        })

    }
    else
        res.redirect('/admin/login')
})


router.get('/disable/:id', (req, res) => {
    if(req.session.admin != undefined && Object.keys(req.session.admin).length > 0) {
        
        new Promise((resolve, reject) => {
            var query = 'UPDATE books SET isApproved = 0 WHERE id = ?'
            con.query(query, [req.params.id], (err, resp) => {
                if(err) reject(err)
                resolve(resp)
            })
        }).then((resp) => {
            // console.log(resp);
            con.query('UPDATE borrowing_status SET status = 0 WHERE book_id = ?', [req.params.id], (err, resp) => {
                if(err) throw err
                res.redirect('/admin')
            })
        })

    }
    else
        res.redirect('/admin/login')
})


router.get('/newrequests', (req, res) => {
    if(req.session.admin != undefined && Object.keys(req.session.admin).length > 0) {
        
        new Promise((resolve, reject) => {
            var query = 'SELECT books.id, books.name, books.author, teacher.name AS teacher_name FROM books LEFT JOIN teacher ON books.teacher_id = teacher.id WHERE books.isApproved = 0;'
            con.query(query, (err, resp) => {
                if(err) reject(err)
                resolve(resp)
            })
        }).then((resp) => {
            console.log(resp);
            res.render('adminPanel/confirmation.ejs', {resp: resp})
        })

    }
    else
        res.redirect('/admin/login')
})


router.get('/approve/:id', (req, res) => {
    if(req.session.admin != undefined && Object.keys(req.session.admin).length > 0) {
        
        new Promise((resolve, reject) => {
            var query = 'UPDATE books SET isApproved = 1 WHERE id = ?'
            con.query(query, [req.params.id], (err, resp) => {
                if(err) reject(err)
                resolve(resp)
            })
        }).then((resp) => {
            // console.log(resp);
            con.query('UPDATE borrowing_status SET status = 1 WHERE book_id = ?', [req.params.id], (err, resp) => {
                if(err) throw err
                res.redirect('/admin/newrequests')
            })
        })

    }
    else
        res.redirect('/admin/login')
})

module.exports = router