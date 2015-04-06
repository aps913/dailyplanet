var express = require('express');
var bodyParser = require('body-parser');
var pg = require("pg");
var methodOverride = require("method-override");

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Refactor connection and query code
var db = require("./models");

//needs to display summary of all articles
app.get('/articles', function(req, res) {
    db.Article.findAll().then(function(articles) {
        res.render('articles/index', { articlesList: articles });
   })  
}); 

//displays form to submit articles
app.get('/articles/new', function(req,res) {
  res.render('articles/new');
});

// //user should not see this page, just used for internal routing
// app.post('/articles', function(req,res) {
//   db.Article.create({title: req.body.article.title, author: req.body.article.author, content: req.body.content}).then(function (article) {
// 	res.redirect("/articles");
// 	});
//   //console.log(req.body);
// });

app.post('/articles', function(req, res) {
   var title = req.body.article.title;
   var author = req.body.article.author;
   var content = req.body.article.content;
   db.Article.create({
       title: title,
       author: author,
       content: content
   }).then(function(article) {
       res.redirect("/articles");
   });
}); 

//to find an article by ID
app.get('/articles/:id', function(req, res) {
  res.render(req.body);
  
})

//displays homepage at localhost3000
app.get('/', function(req,res) {
  res.render('site/index.ejs');
});

//displays about page
app.get('/about', function(req,res) {
  res.render('site/about');
});

//displays contact page
app.get('/contact', function(req,res) {
  res.render('site/contact');
});

//tells the browser where to receive info
app.listen(3000, function() {
  console.log('Listening');
});