var mongoose = require('mongoose');
var db = require("./db_config")
var mongoose=require('mongoose');

var Books = mongoose.Schema({
	REFNO: String,
	BOOKNAME: String,
	AUTHNAME: String,
	AvailableStatus: { type: Boolean, default: true },
}, { collection: 'Books' })

var addBook = mongoose.model('addBook', Books);
exports.addBook = addBook;
exports.saveNewBooks = function (req, res) {

	var bookData = new addBook(req.body);

	bookData.save({}, function (err, data) {
		if (!err) {
			res.sendStatus(200);
		}
		else {
			res.send(err);
		}
	})
}
exports.findBookDetails = function (req, res) {
	console.log(req.body.BOOKNAME);
	if (req.body.BOOKNAME == null && req.body.AUTHNAME == null) {
		console.log('if 1');
		addBook.find({BOOKNAME :  req.body.BOOKNAME}, function (err, data) {
			console.log('data ' + data);
			if (!err) {
				if (data == '') {

					res.sendStatus(400);
				}
				else {
					res.send(data);
				}

			}
		})
	}
	else {
console.log('else 1');
		addBook.find({ $and: [{ BOOKNAME: req.body.BOOKNAME }, { AUTHNAME: req.body.AUTHNAME }] }, function (err, data) {
			if (!err) {
				if (data == '') {
					console.log('else err');
					res.sendStatus(400);

				}
				else {
					console.log(data);
					res.send(data);
				}


			}
			else {
				res.send(err);
			}
		})

	}
}

