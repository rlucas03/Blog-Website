//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');

// mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



mongoose.connect(`mongodb+srv://${process.env.ADMIN_NAME}:${process.env.ADMIN_PW
}@cluster0.2kyn2.mongodb.net/blogDB`, {useNewUrlParser: true, useUnifiedTopology: true});



const postSchema = {
	title: String,
	content: String
};

const Post = mongoose.model("Post", postSchema);

const post1 = new Post ({
	title: 'Welcome to your Blog Posts',
	content: 'Create a unique blog post web page'
});

const post2 = new Post ({
	title: 'Get writing!',
	content: 'Create a unique blog post web page'
});

const defaultPosts = [post1, post2];

// Post.insertMany(defaultPosts, function(err) {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log('Saved default posts to blog');
// 	}
// });

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


// 2 parameters passed in render first is the page we want to render, then an object, a variable in an object in render
app.get('/', function(req, res) {
	  	Post.find({}, function(err, posts){
  		console.log(posts);
  	// search all posts and store in db posts:posts
	res.render('home', { 
		startingContent: homeStartingContent,
		posts: posts
		// link: posts.title
	});
});

});



// key / value. key is in ejs file and value is const up top
app.get('/about', function(req, res) {
	res.render('about', { aboutContent: aboutContent});
});

// passing thru a javascript object that contains the value of contactContent
app.get('/contact', function(req, res) {
	res.render('contact', { contactContent: contactContent});
});

app.get('/compose', function(req, res) {
		res.render('compose');
});

app.post('/compose', function(req, res) {
		const title = req.body.postTitle;
		const postBody = req.body.postBody;

	  const post = new Post({
    	title: req.body.postTitle,
    	content: req.body.postBody
  	});

  	post.save(function(err) {
  		if (!err) {
  			res.redirect('/');
  		}
  	});


// using an object to store title and text area outputs from compose.ejs
		// const post = {
		// 	title: title,
		// 	content: postBody
		// };
		// posts.push(post);
		// using the push method to push elements into array
		
		// redirect to home..makes a get request to / home route
});
// trying to render the post the user wants on post page.

// express routing parameters coming up here more info at expressjs docs
app.get('/posts/:postId', function(req, res) {
	const requestedPostId = req.params.postId;
	// const requestedTitle = _.lowerCase(req.params.postName);
	
	Post.findById(requestedPostId, function(err, post){
	// const storedTitle = _.lowerCase(post.title);
	// console.log(post);
		res.render('post', {
			title: post.title,
			content: post.content
		});
		
	});
	// trying to render just the post the user wants
	// and send it to the global array up top and then render it on the post page via get / route
	// key in obj is what we access in .ejs page
	// new webpage created for us on the fly using ejs and express
	// posts.forEach(function(post) {
	// 	// the _ is for using lodash library
	// 	const storedTitle = _.lowerCase(post.title);
	// 	// if title equals the requested(url) title do this
	// 	if (storedTitle === requestedTitle) {
	// 		res.render('post', {
	// 			title: post.title,
	// 			content: post.content
	// 		});
	// 	} 
	// });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
