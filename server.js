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
	var sql = "INSERT INTO `qz`.`categ_info` (`categ_name`, `parent_categ_id`) VALUES ( ?, ?)";
	var inserts = [req.query.category_name.toLowerCase(), req.query.parent_id];
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

	var sql = "INSERT INTO `qz`.`question_data` (`q_text`, `q_options_1`, `q_options_2`, `q_options_3`, `q_options_4`, `q_correct_option`, `q_category_id`, `q_difficulty_level`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
	var inserts = [req.query.question, req.query.option1, req.query.option2, req.query.option3, req.query.option4, req.query.answer, req.query.cat_drop_down, req.query.diff_level];
	sql = mysql.format(sql, inserts);
	connection.query(sql, function(err, rows, fields) {
	  if (err) {
	  	console.log(err);
	  	res.send(err);
	  }

	  else {
	  	//This code is to update "categ_question TABLE" with new added question and corresponding category id
	  	connection.query('INSERT INTO posts SET ?', {title: 'test'}, function(err, result) {
		  if (err) throw err;
		  
		  var sql2 = "INSERT INTO `qz`.`categ_question` (`q_id`, `categ_id`) VALUES (?,?)";
		  var insert2 = [result.insertId, req.query.cat_drop_down];
		  sql2 = mysql.format(sql2, insert2);
		  connection.query(sql2, function(err, rows, fields){
		  	if(err){
		  		console.log(err);
		  		res.send(err);
		  	}
		  	
		  });
		});
	  	alert("Question Successfully Added!");
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
	var sql = "SELECT id,categ_name from qz.categ_info ORDER BY id ASC";
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
	var sql = "SELECT * from qz.question_data where `categ_info_id`=?";
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
	var sql = "SELECT * from qz.question_data LIMIT ?,?";
	var pageId = ( parseInt(req.query.page) || 1 ) - 1;
	var itemLimit = parseInt(req.query.limit) || 10;
	var startIndex = pageId * itemLimit;
	var queryParams = [startIndex, itemLimit];
	//sql = mysql.format(sql,queryParams);
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


//Extra API by FreakPirate
app.get('/getCategoryMap', function(req,res){
	var sql = "SELECT qz.categ_question.categ_id FROM qz.categ_question WHERE qz.categ_question.q_id = ?";
	var param = parseInt(req.query.id) || 1;

	sql = mysql.format(sql, param);
	connection.query(sql, function(err, rows, fields){
		if(err) {
			console.log(err)
	  		res.send(err);
		}
		else{
			//console.log(rows);
			var sql2 = "SELECT qz.categ_info.categ_name FROM qz.categ_info WHERE qz.categ_info.id = ?";
				sql2 = mysql.format(sql2, rows[0].categ_id);
				connection.query(sql2, function(errq, r, f){
					if(errq){
						console.log(err)
	  					res.send(err);
					}
					else{
						res.send(r[0].categ_name.toString());
					}
				});
		}


	});
});

app.get('/countQuestions', function(req, res){
	var sql = "SELECT COUNT(*) FROM qz.question_data;";
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
