$( document ).ready(function() {
console.log('Loading...');
$.ajax("/getCategories").done(function(data) {
			    //alert(JSON.stringify(data));
				var tableRows = '';
				for (i=0;i<data.length;i++){
				   tableRows += '<tr> <td class="tg-031e">' + data[i].id + '</td> <td class="tg-031e">' + data[i].categ_name   + '</td> </tr> ';
				}
				$('#category_list').append(tableRows);

			  })
			  .fail(function() {
			    alert( "error" );
			  })
			  .always(function() {
			  });
});