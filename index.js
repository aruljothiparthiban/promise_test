var async = require('async');
var Promise = require('promise');
var fs = require('fs');

var result_one = new Promise(function (resolve, reject) {
	fs.readFile('./result_one.json', 'utf8', function read(err, data) {
    	if (err) {
        	reject(err);
    	}
    	else {
    		resolve(JSON.parse(data));
    	}
    });
});
var result_two = new Promise(function (resolve, reject) {
	fs.readFile('./result_two.json', 'utf8', function read(err, data) {
    	if (err) {
        	reject(err);
    	}
    	else {
    		resolve(JSON.parse(data));
    	}
    });
});

async.parallel([
	function first(cb){
		result_one.then(function(data){
			console.log('data',data);
			cb(null,data);
		});
	},
	function second(cb){
		result_two.then(function(data){
			console.log('data',data);
			cb(null,data);
		});
	}
],function(err,result){
	if(!err){
		console.log('Result : ',result);
	}
	else{
		console.log('Error :'err);
	}
});
