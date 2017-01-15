var mongoose=require('mongoose');
var addBookModel =  require("./addBook");
var db=require("./db_config")

		var IssueBooks=mongoose.Schema({
			REFNO:String,
			BOOKNAME:String,
			AUTHNAME:String,
			AvailableStatus:{type : Boolean, default : false},
			STUDENTNAME:String,
			REGISTRATION:String,
			ISSUEDATE:Date,
			RETURNDATE:Date,
			ISSUEDEMPID:String
			
		},{ collection: 'IssueBooks' })

		var issue = mongoose.model('issue', IssueBooks);

		    exports.issueBookDetails = function(req,res){
				//Test code
				
		        var issueData=new issue(req.body);

		         issueData.save({},function(err, data){
					 console.log('after issuebook'+data);

		         	if(!err){

						 //Test code
						 addBookModel.addBook.find({BOOKNAME :  req.body.BOOKNAME}, function (err, data) {
							if (!err) {
								if (data == '') {
									res.sendStatus(400);
								}
								else {
									if(data && data.AvailableStatus){
										data.AvailableStatus = false;
										var bookDataToSave = new addBookModel.addBook(data);
										bookDataToSave.save({},  function(err, data){
											res.sendStatus(200);
										})

									}
									
								}

							}
						})

						 //End 
		         	}
		         	else{
		         		res.send(err);
		         	}
		       })
		    }
