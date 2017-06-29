var mongoose = require('mongoose');
var express = require('express');
var flash = require('connect-flash');
var expressValidator = require('express-validator');

mongoose.Promise = global.Promise;

var go = express();

//include files from models folder
var User = require('../models/user');

//Connect to the database
mongoose.connect('mongodb://<username>:<password>@ds119302.mlab.com:19302/todo');
var db = mongoose.connection;

// Input data in database
  go.post('/signup', function(req,res){
  var  FirstName = req.body.FirstName;
  var  LastName  = req.body.LastName;
  var  Username  = req.body.Username;
  var  Password  = req.body.Password;
  var  ConfirmPassword = req.body.ConfirmPassword;
  var  Gender  = req.body.Gender;

  // Validation
	req.checkBody('ConfirmPassword', 'Passwords do not match').equals(req.body.Password);

  var errors = req.validationErrors();


var newUser = new User({
      FirstName : FirstName,
      LastName  : LastName,
      Username  : Username,
      Password  : Password,
      Gender    : Gender
    	});

// create users
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);

  });

  req.flash('success_msg', 'You are sign up and you can  login now');

  res.redirect('/login');


});



// authentication
go.post('/login',function(req,res){
  User.findOne( {Username:req.body.Username},function(err,user){
if(!user)
{    req.flash('success_msg', 'Unknown User');
  res.redirect('login');
  }
else{
  User.comparePassword(req.body.Password, user.Password, function(err, isMatch){
    if(err) throw err;
    if(isMatch){
      var name=user.FirstName;
      	res.render('userloggedin',{ name: name});

    } else {
        req.flash('error_msg', 'Invalid Password');
      res.redirect('login');
    }
  });

}
  });
  });


//logout function
go.get('/logout', function(req, res){
  req.logout();


});

// home
go.get('/', function(req, res){
	res.render('home');
});

//signup
go.get('/signup', function(req, res){
	res.render('signup');
});

go.get('/home', function(req, res){
	res.render('home');
});

//notesview
go.get('/notesview', function(req, res){
	res.render('notesview');
});

go.get('/login', function(req, res){
		res.render('login');
});

go.get('/adminlogin', function(req, res){
		res.render('adminlogin');
});


module.exports = go;
