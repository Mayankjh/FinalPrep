var express = require('express');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var session = require('express-session');
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var path = require('path');
var exphbs = require('express-handlebars');
var multer =  require('multer');
var go = express();

//include files from directory....
var logincontroller = require('./routes/logincontroller');
var adminlogincontroller = require('./routes/adminlogincontroller');
var uploading = require('./routes/uploading');
var user = require('./models/user');



//set up emplate engine
go.set('views', path.join(__dirname, 'views'));
go.engine('handlebars', exphbs({defaultLayout:'layout'}));
go.set('view engine', 'handlebars');

//static files
go.use(express.static((__dirname, 'public')));


//include files from routes folder
 var users = require('./routes/logincontroller');
 var users = require('./routes/logincontroller');
 var uploading = require('./routes/uploading');


// BodyParser Middleware
go.use(bodyParser.json());
go.use(bodyParser.urlencoded({ extended: true }));
go.use(cookieParser());

//Express Session
go.use(session({
  secret: 'secretsmmsmsmmm',
  saveUninitialized : true,
  resave : true
}));




//flash
go.use(flash());




//express-validator
go.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      var root    = namespace.shift()
      var formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

//Global vars
go.use(function(req,res,next){
  res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
      res.locals.error = req.flash('error');
      res.locals.user = req.user || null;
      next();
});



//use included files
go.use(logincontroller );
go.use(adminlogincontroller );
go.use(uploading );
go.use( '/user',user);


//listen to port
go.listen(1000);
console.log('All well listening to port 1000');
