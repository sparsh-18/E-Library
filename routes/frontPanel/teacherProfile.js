const express = require('express');
const router = express.Router();
const con = require("../../configs/DBConnection");
const path = require("path");

router.get('/', (req, res) => {

    if(req.session.teacher != undefined && Object.keys(req.session.teacher).length !=0) {

        res.redirect('/teacher/profile')
    }
    else
        res.redirect('/teacher/login')    
})

router.get('/profile', (req, res) => {

    if(req.session.teacher != undefined && Object.keys(req.session.teacher).length !=0) {

        const getTeacherDetails = new Promise((resolve, reject) => {
            con.query('SELECT id, name, email, dept FROM teacher WHERE id = ?', 
                [req.session.teacher.id], (err, result) => {
                    if(err) reject(err);
                    resolve(result)
            })
        })

        getTeacherDetails.then(result => {
            res.render('frontPanel/teacherProfile.ejs', {result: result})
        });
    }
    else
        res.redirect('/teacher/login')
    
})


router.post('/addnewbook', (req, res) => {
    if(req.session.teacher != undefined && Object.keys(req.session.teacher).length !=0) {

        var name = req.body.name;
        var author = req.body.author;
        var about = req.body.about;
        
        if(req.files.bookPath && req.files.img) {
            var bookPath = req.files.bookPath;
            var img = req.files.img;

            var pathName = bookPath.name;
            var imgName = img.name;

            var dirPath = '../../public/upload/'+pathName;
            var dirImg = '../../public/images/books/'+imgName;

            bookPath.mv(path.join(__dirname, dirPath), (err) => {
                if(err) throw err;
            })

            img.mv(path.join(__dirname, dirImg), (err) => {
                if(err) throw err;
            })

            con.query('INSERT INTO books (name, author, about, path, img, teacher_id, isApproved) VALUES (?,?,?,?,?,?,0)',
            [name, author, about, pathName, imgName, req.session.teacher.id], (err, result) => {
                if(err) throw err;
                
                res.redirect('/teacher/profile');
            })

        }
    }
    else
        res.redirect('/teacher/login')
})

module.exports = router