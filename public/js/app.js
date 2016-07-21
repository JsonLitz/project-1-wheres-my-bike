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
  $.ajax({
    method: 'POST',
    url: 'api/locations',
    data: dataString,
    // the data type here is ONE json object
    success: handlePostSuccess,
    error: handleError
  });
  // $('form').trigger('reset');
  console.log('Testing submit');
});


// success for GET ALL
function handleSuccess(taco) {
    console.log("THIS TACO IS A : " , taco);
    taco.forEach(function renderOne(element){
        render(element);
    });
}

// general error handler
function handleError() {
  console.log("error");
}
