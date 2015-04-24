var express = require('express'),
	app = express(),
	path = require('path'),
	server = require('http').createServer(app),
	lessMiddleware = require('less-middleware'),
	mysql = require('mysql'),
	logger = require('morgan'),
	bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'laptop'
});


connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

//app.use(logger());
//
app.use(lessMiddleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
//
//// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.get('/addc', function(req,res)	{
	console.log('Got Request');
	console.log(req.query);
	//Add to Mysql
	//
	var sql = "INSERT INTO `qriozity`.`trivia_categories` (`categ_name`, `categ_desc`) VALUES ( ?, ?)";
	var inserts = [req.query.category_name.toLowerCase(), req.query.message];
	sql = mysql.format(sql, inserts);
	connection.query(sql, function(err, rows, fields) {
	  if (err)	{
	  	console.log(err);
	  	res.send(err);
	  }
	  else {
	  	res.redirect("/category.html");
	  }

	});



});

app.get('/addq', function(req,res)	{
	console.log(req.query);

	var sql = "INSERT INTO `qriozity`.`trivia_questions` (`question`, `trivia_categories_id`,`choices`, answer, tags) VALUES ( ?, ?, ?, ?, ?)";
	var choice = req.query.option1+'|'+req.query.option2+'|'+req.query.option3+'|'+req.query.option4;
	var inserts = [req.query.question, req.query.cat_drop_down,choice, req.query.answer, req.query.tags];
	sql = mysql.format(sql, inserts);
	connection.query(sql, function(err, rows, fields) {
	  if (err) {
	  	console.log(err);
	  	res.send(err);
	  }
	  else {
	  	res.redirect("/quiz.html");
	  }

	});


});


app.get('/', function(req,res){
	res.send('index.html');
});


app.get('/public/:file',function(req,res){
	res.sendFile(__dirname + '/public/' + req.params.file);
});
app.get('/public/js/:file',function(req,res){
	res.sendFile(__dirname + '/public/' + req.params.file);
});
app.get('/public/css/:file',function(req,res){
	res.sendFile(__dirname + '/public/' + req.params.file);
});
app.get('/public/fonts/:file',function(req,res){
	res.sendFile(__dirname + '/public/' + req.params.file);
});

app.get("/getCategories", function(req,res){
	var sql = "SELECT id,categ_name from qriozity.trivia_categories ORDER BY id ASC";
	connection.query(sql, function(err, rows, fields) {
	  if (err) {
	  	console.log(err) ;
	  	res.send(err);
	  }
	  else {
		  //console.log(rows);
		  var data = [];
		  for( val in rows)	{
		  	data.push({id: rows[val].id ,categ_name : rows[val].categ_name});
		  }
		  res.send(data);
	  }


	});

});

app.get('/quizQuestionsByCategory/:categoryId', function(req,res){
	var sql = "SELECT * from qriozity.trivia_questions where `trivia_categories_id`=?";
	console.log(req.params);
	var cId = parseInt(req.params.categoryId);
	var queryParams = [req.params.categoryId];
	sql = mysql.format(sql, queryParams);
	connection.query(sql, function(err, rows, fields) {
	  if (err)  {
	  	console.log(err);
	  	res.send(err);
	  }
	  else {
	 	 //console.log(rows);
	 	 res.send(rows);
	  }


	});

});

app.get('/allQuizQuestions', function(req,res){
	var sql = "SELECT * from qriozity.trivia_questions LIMIT ?,?";
	var pageId = ( parseInt(req.query.page) || 1 ) - 1;
	var itemLimit = parseInt(req.query.limit) || 10;
	var startIndex = pageId * itemLimit;
	var queryParams = [startIndex, itemLimit];
	sql = mysql.format(sql,queryParams);
	sql = mysql.format(sql, queryParams);
	connection.query(sql, function(err, rows, fields) {
	  if (err) {
	  	console.log(err)
	  	res.send(err);
	  }
	  else {
	  	res.send(rows);
	  }


	});
});

app.get('/countQuestions', function(req, res){
	var sql = "SELECT COUNT(*) FROM qriozity.trivia_questions;";
	connection.query(sql, function(err, rows, fields) {
	  if (err) {
	  	console.log(err)
	  	res.send(err);
	  }
	  else {
	  	res.send(rows);
	  }
	});
});



app.listen(80, function(){
	console.log('Listening on 80');
});
