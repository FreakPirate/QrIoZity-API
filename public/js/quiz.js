$( document ).ready(function() {
console.log('Loading...');
$.ajax("/getCategories").done(function(data) {
			    //alert(JSON.stringify(data));
				var option = '';
				for (i=0;i<data.length;i++){
				   option += '<option value="'+ data[i].id + '">' + data[i].categ_name + '</option>';
				}
				$('#cat_drop_down').append(option);

			  })
			  .fail(function() {
			    alert( "error" );
			  })
			  .always(function() {
			  });
});