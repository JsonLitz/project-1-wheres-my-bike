(function($){
  $(function(){

    $('.button-collapse').sideNav();


  }); // end of document ready
})(jQuery); // end of jQuery name space



var allLocations = [];

$locationsList = $('.locationsTarget');

// compile handlebars template
var source = $('#locations-template').html();
 template = Handlebars.compile(source);



$.ajax({
  method: 'GET',
  url: '/api/locations',
  success: handleGetAllSuccess,
  error: handleError
});


$("#crossStreets").on("submit", function(event) {
  event.preventDefault();
  var dataString = $(this).serialize();
  console.log(dataString);
  $.ajax({
    method: 'POST',
    url: 'api/locations',
    data: dataString,
    success: handlePostSuccess,
    error: handleError
  });
  $('form').trigger('reset');
  console.log();
});

//button that deletes
$locationsList.on('click', '.deleteBtn', function() {
  $.ajax({
    method: 'DELETE',
    url: '/api/locations/'+$(this).attr('data-id'),
    success: deleteLocationSuccess,
    error: deleteLocationError
  });
});


$locationsList.on('click', '.updateBtn', function() {
  $.ajax({
    method: 'UPDATE',
    url: '/api/locations/'+$(this).attr('data-id'),
    success: updateLocationSuccess,
    error: updateLocationError
  });
});


function render () {
  // empty existing posts from view
  $locationsList.empty();
  // pass `allLocations` into the template function
  var locationsHtml = template({ locations: allLocations });
  console.log("RENDERING...");
  console.log(locationsHtml);
  // append html to the view
  $locationsList.append(locationsHtml);
}


// success for GET ALL
function handleGetAllSuccess(taco) {
    allLocations = taco;
    console.log("ALL LOCATIONS: " , allLocations);
    render();
}
function deleteLocationSuccess(json) {
    var location = json;
    var locationId = location._id;

    // find the location with the correct ID and remove it from our allLocations array
    for(var index = 0; index < allLocations.length; index++) {
      if(allLocations[index]._id === locationId) {
        allLocations.splice(index, 1);
        break;
      }
    }
    render(allLocations);

}

function updateLocationSuccess(json) {

}
function handleSuccess(json) {
  allLocations = json;
  render();
}
function handlePostSuccess(json) {
    console.log(json);
    allLocations.unshift(json);
    console.log(allLocations);
    render();
}

//General error handler
function handleError(e) {
  console.log('Ah, oops');
  $('.locationsTarget').text('Failed to load locations, is the server working?');
}

function deleteLocationError(){
    console.log('oops the location wasnt deleted');
}
