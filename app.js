//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const date=require(__dirname +'/date.js');
const _=require('lodash');
const mongoose= require('mongoose');

mongoose.connect();


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

// app.use(express.favicon())

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// let posts=[];
const entrySchema= new mongoose.Schema({
  title:String,
  date: Date,
  content: String
})

const Entry = mongoose.model('blogEntry', entrySchema);

const entry1= new Entry({
  title: 'Day 1',
  date: new Date(),
  content: 'This is my first blog entry that is saved into a data base.'
})

// entry1.save();

app.get('/',function (req,res){
  Entry.find({}, function (error, posts) {
    // console.log(posts);
    res.render('home', {
      pcontent:homeStartingContent,
      postsItems:posts
    });
  });  
  // console.log(posts);
  
});


app.get('/about',function (req,res){
  res.render('about', {
    pcontent:aboutContent
  });
  
});

app.get('/contact',function (req,res){
  res.render('contact', {
    pcontent:contactContent
  });
  
});

app.get('/compose',function (req,res){
  res.render('compose')
  // console.log('hola');
  
});

app.post('/compose', function(req,res){
  // console.log(req.body.postTitle, req.body.postBody);
  const entryDate= new Date();
  const post= new Entry({
    title:req.body.postTitle,
    date:entryDate,
    content:req.body.postBody
  })
  post.save();
  // const post={
  //   date:entryDate,
  //   title:req.body.postTitle,
  //   content:req.body.postBody
  // };
  // // console.log(post.title, post.body);
  // posts.push(post);
  
  res.redirect('/')
})

app.get('/post/:entryTitle',function (req,res){
  const requestedPost= req.params.entryTitle;
  // console.log(requestedPost);

  Entry.findOne({_id:requestedPost}, function(err, foundPost){
    if(!err){
      res.render('post',{
        postTitle:foundPost.title,
        postDate:foundPost.date,
        postBody:foundPost.content
      });  
    }  
  });  
  // console.log('hola');  
});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
