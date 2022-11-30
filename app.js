const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const utility = require(__dirname + '/utility.js');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

mongoose.connect("mongodb://localhost:27017/blogDB");

const postSchema = new mongoose.Schema({
  title: String,
  body: String
});

const Post = mongoose.model('Post', postSchema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
  Post.find({}, (err, foundPost) => {
    if(!err){
      res.render('home', {homeStartingContent: homeStartingContent, posts:foundPost, utility: utility});
    }
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.get('/posts/:postID', (req, res)=> {
  const id = req.body.postID;
  Post.findOne(id, (err, foundPost) => {
    if(!err){
      res.render('post', {postTitle: foundPost.title, postBody: foundPost.body})
    }
  });
});

app.post('/compose', (req, res) => {
  let post = req.body;
  const newPost = new Post ({title: post.postTitle, body: post.postBody});
  newPost.save(err => {
    if(!err){
      res.redirect('/');

    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
