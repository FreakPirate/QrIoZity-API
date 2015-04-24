$( document ).ready(function() {
console.log('Loading...');
$.ajax("/allQuizQuestions").done(function(data) {
			    alert(JSON.stringify(data));
				var tableRows = '';
				for (i=0;i<data.length;i++){

				   tableRows += '<tr> <td class="tg-031e">' + data[i].id + '</td> <td class="tg-031e">' + data[i].trivia_categories_id + '</td> <td class="tg-031e">' + data[i].question + '</td> <td class="tg-031e">' + data[i].choices + '</td> <td class="tg-031e">' + data[i].answer + '</td> <td class="tg-031e">' + data[i].tags + '</td> <td class="tg-031e">' + data[i].date_created + '</td> </tr> ';
				}
				$('#questions').append(tableRows);

			  })
			  .fail(function() {
			    alert( "error" );
			  })
			  .always(function() {
			  });
});