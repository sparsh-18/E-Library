const express = require('express');
var router = express.Router();
var con = require("../../configs/DBConnection");

router.get('/profile', (req, res) => {

    if(req.session.student != undefined && Object.keys(req.session.student).length !=0) {

        const getStudentDetails = new Promise((resolve, reject) => {
            con.query('SELECT id, name, email FROM students WHERE id = ?', 
                [req.session.student.id], (err, result) => {

                    if(err) reject(err);

                    resolve({'student': result[0]})
            })
        })


        // getStudentDetails.then(result => {
        //     console.log(result);
        // });

        
        const getBorrowedBooks = new Promise((resolve, reject) => {
            var query = 'SELECT B.id, B.name FROM books AS B INNER JOIN borrowing_status AS BS WHERE BS.student_id = ? AND BS.status = 1 AND BS.book_id = B.id;'
            con.query(query, [req.session.student.id], (err, result) => {
                if(err) reject(err);

                var books = {books: result}
                resolve(books);
            })
        })

        //getBorrowedBooks.then(result => console.log(result));

        Promise.all([getStudentDetails, getBorrowedBooks]).then((result) => {
            console.log(result[1]);
            res.render('frontPanel/studentProfile.ejs', {result: result});
        }).catch(err => {if(err) throw err});

    }
    else
        res.redirect('/student/login')
    
})




module.exports = router