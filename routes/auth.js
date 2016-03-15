var express = require('express');
var router = express.Router();

// get register - show registration form
router.get('/register', function(req, res, next){
    res.render('auth/register',
    {
        title: 'Register'
    });
});

//get login - show login form

router.get('/login', function(req, res, next){
    res.render('auth/login',
        {
            title: 'Login'
        });
});

//make this public
module.exports = router;