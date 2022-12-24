const express = require('express');
var router = express.Router();
var con = require("../../configs/DBConnection");

// show all the books
router.get('/', (req, res) => {
    if(req.session.student != undefined && Object.keys(req.session.student).length !=0) {
        con.query('SELECT * FROM books WHERE isApproved = 1', (err, result) => {
            if(err) throw err;
            res.render('frontPanel/index.ejs', {result: result})
        })
    }
    else
        res.redirect('/student/login')
})

// show book
router.get('/book/:id', (req, res) => {
    if(req.session.student != undefined && Object.keys(req.session.student).length !=0) {
        con.query('SELECT * FROM books WHERE id = ?',[req.params.id], (err, result) => {
            if(err) throw err;
            res.render('frontPanel/post-details.ejs', {result: result})
        })
    }
    else
        res.redirect('/student/login')
})

//assign and open book
router.get('/book/read/:id', (req, res) => {
    if(req.session.student != undefined && Object.keys(req.session.student).length !=0) {
       // console.log('logged in');
        function isAssigned(bookId, studentId) {
            return new Promise((resolve, reject) => {
                con.query('SELECT * FROM borrowing_status WHERE student_id = ? AND book_id = ?', 
                [studentId, bookId], (err, resp) => {
                    if(err) return reject(err)
                    if(resp.length > 0) resolve(true)
                    else resolve(false)
                })
            })
        }

        function checkStatus(bookId, studentId) {
            return new Promise((resolve, reject) => {
                con.query('SELECT * FROM borrowing_status WHERE student_id = ? AND book_id = ? AND status = 1', 
                [studentId, bookId], (err, resp) => {
                    if(err) return reject(err)
                    if(resp.length > 0) resolve(true)
                    else resolve(false)
                })
            })
        }

        function setStatus(bookId, studentId) {
            return new Promise((resolve, reject) => {
                con.query('UPDATE borrowing_status SET status = 1 WHERE student_id = ? AND book_id = ?', 
                [studentId, bookId], (err, resp) => {
                    if(err) return reject(err)
                    if(resp.length > 0) resolve(true)
                    else resolve(false)
                })
            })
        }

        function assignBook(bookId, studentId) {
            return new Promise((resolve, reject) => {
                con.query('INSERT INTO borrowing_status VALUES (?, ?, 1)', 
                [studentId, bookId], (err, resp) => {
                    if(err) return reject(err)
                    if(resp.length > 0) resolve(true)
                    else resolve(false)
                })
            })
        }

        isAssigned(req.params.id, req.session.student.id).then((assigned) => {
            if(assigned) {
                console.log(assigned);
                checkStatus(req.params.id, req.session.student.id).then((status) => {
                    if(!status) {
                        setStatus(req.params.id, req.session.student.id).then(() => {}).catch((er) => {
                            if(er) throw er;
                        })
                    }
                }).catch((er) => {
                    if(er) throw er;
                })
            } else {
                console.log('here');
                assignBook(req.params.id, req.session.student.id).then(() => {}).catch((er) => {
                    if(er) throw er;
                })
            }

            con.query('SELECT path FROM books WHERE id = ?', [req.params.id], (err, resp) => {
                if(err) throw err;
                console.log(resp);
                res.render('frontPanel/read2.ejs', {bookPath: resp[0].path, id: req.params.id})
            })
        }).catch((er) => {
            if(er) throw er;
        })

        
    }
    else
        res.redirect('/student/login')
})

// remove assigned
router.get('/removebook/:id', (req, res) => {
    if(req.session.student != undefined && Object.keys(req.session.student).length !=0) {
        con.query('DELETE FROM borrowing_status WHERE student_id = ? AND book_id = ?',[req.session.student.id, req.params.id], (err, result) => {
            if(err) throw err;
            res.redirect('/student/profile')
        })
    }
    else
        res.redirect('/student/login')
})

module.exports = router