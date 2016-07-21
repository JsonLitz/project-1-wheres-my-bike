(function($){
  $(function(){

    $('.button-collapse').sideNav();


  }); // end of document ready
})(jQuery); // end of jQuery name space

$("form").on("submit", function(event) {
  // event.preventDefault();
  // var dataString = $(this).serialize();
  console.log($(this).serialize());
  console.log('Testing submit');
  // $.ajax({
  //   method: 'POST',
  //   url: 'api/albums',
  //   data: dataString,
  //   // the data type here is ONE json object
  //   success: handlePostSuccess,
  //   error: handleError
  // });
  // $('form').trigger('reset');
});
console.log('Testing submit')
