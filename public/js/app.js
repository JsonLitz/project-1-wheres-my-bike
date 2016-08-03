(function($){
  $(function(){
    $('.button-collapse').sideNav();
    var $streetOne = $('#stOne0').text();
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
    // the data type here is ONE json object
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

//Update part of CRUD
$locationsList.on('click', '.updateBtn', function() {
  $.ajax({
    method: 'UPDATE',
    url: '/api/locations/'+$(this).attr('data-id'),
    // Does data need to be sent to the update route?
    success: updateLocationSuccess,
    error: updateLocationError
  });
});

// TODO: Rather than rendering all locations at once, you may consider making the template process locations
// one at a time so you do not have to re-render all data each time that a change is made

function render () {
  // empty existing posts from view
  $locationsList.empty();
  // pass `allLocations` into the template function
  var locationsHtml = template({ locations: allLocations });
  // append html to the view
  $locationsList.append(locationsHtml);
}


// success for GET ALL
function handleGetAllSuccess(taco) {
  // TODO: Taco is fun for development and testing, but you should use descriptive variable names for production code
  allLocations = taco;
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

// TODO: Remove or comment out unfinished features
// It could also be helpful to leave yourself a comment about what you had hoped to accomplish with this function
// That way, you have a starting point mapped out for yourself when you come back to work on this
function updateLocationSuccess(json) {

}

function handleSuccess(json) {
  allLocations = json;
  render();
}

function handlePostSuccess(json) {
  console.log(json);
  // Nice use of unshift to include the most recent loction on top
  allLocations.unshift(json);
  console.log(allLocations);
  render();
}

//General error handler
function handleError(e) {
  console.log('You gotta Log in!');
  // Nice error handling! It's great that you're communicating with the user
  $('.locationsTarget').text('Failed to load locations, are you logged in?');
}

function deleteLocationError(){
  console.log('oops the city wasnt deleted');
}

//Logout function
$('#logout').click(function logout(){
  $.ajax({
      type: 'GET',
      url: '/logout',
      success: logoutSuccess
  });

  function logoutSuccess(json) {
    window.location.reload();
  }
  console.log('loggin out');
});


// TODO: I'd recommend wrapping this in a function that you can call
if (username !== null) {
    $('.username').html( username + '!');
} else {
  // What is this console log accomplishing? This could be a good method to use to
  // adjust the view so unauthenticated users don't try to CRUD locations before logging in.
    console.log('null');
}
