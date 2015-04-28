var express = require('express'),
	app = express(),
	path = require('path'),
	server = require('http').createServer(app),
	lessMiddleware = require('less-middleware'),
	mysql = require('mysql'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	multer = require('multer');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'rahul'
});


connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

//Parse Mutlipart Form Data
app.use(multer({ dest: './uploads/'}));
// parse application/json
app.use(bodyParser.json());
//// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.get('/', function(req,res){
	res.send('index.html');
});

//TODO : Add POST API, enable API KEY.

app.get('/v1/questionCount', function(req, res){

	res.contentType('application/json');

	var sql = "SELECT COUNT(*) FROM qz.question_data;";
	connection.query(sql, function(err, rows, fields) {
	  if (err) {
	  	console.log(err);
	  	res.json({status: "NAK", message:err});
	  }
	  else {
	  	var no = rows[0];
			var count = 0;
	 		for(x in no) {
	  			count = no[x];
	 		}
	  	res.json({'count' : count});
	  }
	});
});

app.get("/v1/getCategoryList", function(req,res){

	res.contentType('application/json');

	var sql = "SELECT id,categ_name from qz.categ_info ORDER BY id ASC";
	connection.query(sql, function(err, rows, fields) {
	  if (err) {
	  	console.log(err) ;
	  	res.json({status: "NAK", message:err});
	  }
	  else {
		  var data = [];
		  for( val in rows)	{
		  	data.push({id: rows[val].id ,categ_name : rows[val].categ_name});
		  }
		  res.json(data);
	  }
	});
});

app.get('/v1/getQuizQuestionsByCategory', function(req,res)	{
	res.contentType('application/json');

  var sql = "SELECT question.id,question.q_text,question.q_options_1,question.q_options_2,question.q_options_3,question.q_options_4,question.q_correct_option,question.q_date_added, categ.categ_id \
  FROM qz.question_data question , qz.categ_question categ  \
  WHERE categ.categ_id=? AND question.id=categ.q_id \
  LIMIT ?,?";
  var pageId = ( parseInt(req.query.page) || 1 ) - 1;
  var itemLimit = parseInt(req.query.limit) || 10;
  var startIndex = pageId * itemLimit;
  console.log(req.query);
  var cId = parseInt(req.query.categoryId) || 3;
  var queryParams = [cId,startIndex, itemLimit];

  sql = mysql.format(sql, queryParams);
  console.log(sql);
  connection.query(sql, function(err, rows, fields) {
    if (err)  {
          console.log(err);
          res.json({status: "NAK", message:err});
    }
    else {
           res.json(rows);
    }
  });
});

app.get('/v1/getAllQuizQuestions', function(req,res){

	res.contentType('application/json');

	var sql = "SELECT * from qz.question_data LIMIT ?,?";
	var pageId = ( parseInt(req.query.page) || 1 ) - 1;
	var itemLimit = parseInt(req.query.limit) || 10;
	var startIndex = pageId * itemLimit;
	var queryParams = [startIndex, itemLimit];
	sql = mysql.format(sql,queryParams);
	connection.query(sql, function(err, rows, fields) {
	  if (err) {
	  	console.log(err)
	  	res.json({status: "NAK", message:err});
	  }
	  else {
	  	res.json(rows);
	  }
	});
});

app.get('/v1/getRandomQuestion', function(req,res){
	res.contentType('application/json');
	var sql = "SELECT COUNT(*) FROM qz.question_data;";
	connection.query(sql, function(err, rows, fields) {
		if (err) {
			console.log(err);
			res.json({status: "NAK", message:err});
		}
		else {
			var no = rows[0];
			var count = 0;
			for(x in no) {
					count = no[x];
			}

			var sql = "SELECT * from qz.question_data where id=?";
			var randomId = parseInt(count * Math.random());
			var queryParams = [randomId];
			sql = mysql.format(sql,queryParams);
			connection.query(sql, function(err, rows, fields) {
				if (err) {
					console.log(err);
					res.json({status: "NAK", message:err});
				}
				else {
					res.json(rows[0]);
				}
			});
		}
	});
});



app.listen(3002, function(){
	console.log('Listening on 3002');
});
