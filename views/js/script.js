$(document).ready(function() {  
   $('.delete-btn').click(function(e) {
	e.preventDefault();
	console.log('click accessed');
	var toRemove = $(this);
	var parent = $(this).parent();
	$.ajax({
		url: toRemove,
		method: 'DELETE'
	}).done(function(data) {
		console.log(data + "success");
		if(data.msg === 'success') {
			parent.fadeOut(2000, function(){
				parent.remove();
			});
		}
	});
});
});
