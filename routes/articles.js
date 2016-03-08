var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Article = require('../models/article');

// set up the GET handler for the main articles page
router.get('/', function(req, res, next) {
    // use the article model to query the articles collection in the db

    // use the Article model to retrieve all articles
    Article.find(function (err, articles) {
        // if we have an error
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            // we got data back
            // show the view and pass the data to it
            res.render('articles/index', {

                title: 'Articles',
                articles: articles
            });
        }
    });
});

//GET handler for add to display a blank form.
router.get('/add', function(req, res, next) {
    res.render('articles/add', {
        title: 'Add a new Article'
    });
});

//POST  handler for add to process the form.
router.post('/add', function(req, res, next) {

    //Save a new article
    Article.create(
        {
            title: req.body.title,
            content: req.body.content
        }
    );

    //redirect to main articles.
    res.redirect('/articles');
});

//get handler for edit to show the populated form
router.get('/:id', function(req, res, next){

   //create and id variable to store the id from the url
    var id = req.params.id;

    // look up the selected article
    Article.findById(id, function(err, article){
        if (err){
            console.log(err);
            res.end(err);
        }
        else {
            //show the edit view
            res.render('articles/edit', {
                title: 'Article Details',
                article: article
            });
        }
    });
});

//post handler for edit to update the article

router.post('/:id', function(req, res, next){
    //create and id variable to store the id from the url
    var id = req.params.id;

    //fill the article object
    var article = new Article({
        _id: id,
        title: req.body.title,
        content: req.body.content
    });
    //use mongoose and our article modle to update
    Article.update( {_id: id}, article, function(err){
        if (err) {
            console.log(err)
            res.end(err);
        }
        else {
            res.redirect('/articles');
        }
    });
});

//get handler for delete using the article id
router.get('/delete/:id', function(req, res, next){
    //grab the id parameter from the url
   var id = req.params.id;

    console.log('trying to delete');
    Article.remove({ _id: id }, function(err) {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // show updated articles page with redirect
            res.redirect('/articles');
        }
    });
});

// make public
module.exports = router;