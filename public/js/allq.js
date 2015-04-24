$( document ).ready(function() {
	
	console.log('Loading...');
	$.ajax("/countQuestions").done(function(data) {
			 var no = data[0];
			 var a = 0;
 			for(x in no) {
  				a = no[x];
 			}
 			onItemGet(a);
	});

	function setPagination (curPageNumber) {
		var url = "/allQuizQuestions?page=" + curPageNumber + "&limit=10";
		$.ajax(url).done(function(data) {
				var tableRows = '';

				for (i=0;i<data.length;i++){
					var name_categ = getCategName(data[i].id);
					//console.log(name_categ);
				   tableRows += '<tr class="question"> <td class="tg-031e">' + data[i].id + '</td> <td class="tg-031e">' + data[i].q_text + '</td> <td class="tg-031e">' + data[i].q_options_1 + '</td> <td class="tg-031e">' + data[i].q_options_2 + '</td> <td class="tg-031e">' + data[i].q_options_3 + '</td> <td class="tg-031e">' + data[i].q_options_4 + '</td> <td class="tg-031e">' + data[i].q_correct_option + '</td> <td class="tg-031e">' + name_categ + '</td> <td class="tg-031e">' + data[i].q_difficulty_level + '</td> </tr> ';
				}
				$('.question').remove();
				$('#questions').append(tableRows);

			  })
			  .fail(function() {
			    alert( "error" );
			  })
			  .always(function() {
			  });
	}

	function getCategName(id){
		var url = "/getCategoryMap?id=" + id;
		$.ajax(url).done(function(data){
			console.log(data);
			return data;
		})
		.fail(function(){
			alert("error");
		});
	}

	function onItemGet(pagination_items){

		$(".pagination").pagination({
        	items: pagination_items,
        	itemsOnPage: 10,
        	cssStyle: 'light-theme',
        	onInit:function(){
        		setPagination(1);
        	},
        	onPageClick:function(pageNumber){
        		setPagination(pageNumber);
        	}
    	});


	}
});
