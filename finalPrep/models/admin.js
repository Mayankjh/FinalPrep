var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var adminSchema = mongoose.Schema({
	FirstName: {
		type: String,
		index:true
	},
	LastName: {
		type: String
	},
	Username: {
		type: String
	},
	Password: {
		type: String
	},
    Gender : {
		type: String
	}
});

var admin = module.exports = mongoose.model('admin', adminSchema);



//method to create User
module.exports.createUser = function(newadmin, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newadmin.Password, salt, function(err, hash) {
	        newadmin.Password = hash;
	        newadmin.save(callback);
	    });
	});
}

//methode to get user by User by Username
module.exports.getadminByadminname = function(username, callback){
	var query = {Username: re};
	admin.findOne(query, callback);
}

//methode to get user by User by Id
module.exports.getadminById = function(id, callback){
	admin.findById(id, callback);
}

//methode to check or compare password
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
