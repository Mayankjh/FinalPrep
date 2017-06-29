var express =   require("express");
var multer  =   require('multer');
var go         =   express();

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './upload');
  },
  filename: function (req, file, callback) {
    callback(null,Date.now()+file.originalname);
  }
});

var upload = multer({ storage : storage}).single('upload_file');
go.set('view engine', 'handlebars');


//static files
go.use(express.static((__dirname, 'public')));

go.post('/upload',function(req,res){

    upload(req,res,function(err) {
        if(err) {
      res.render('admin');
        }

      res.render('admin');
    });
});

//notes
go.get('/', function(req, res){
	res.render('notes');
});
//notes
go.get('/notes', function(req, res){
	res.render('notes');
});

//posts
go.get('/posts', function(req, res){
	res.render('posts');
});

//users
go.get('/users', function(req, res){
	res.render('users');
});

//admin
go.get('/admin', function(req, res){
	res.render('admin');
});

//logout function
go.get('/logout', function(req, res){
  req.logout();
});


module.exports = go;
