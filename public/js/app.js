(function($){
  $(function(){

    $('.button-collapse').sideNav();


  }); // end of document ready
})(jQuery); // end of jQuery name space



var allLocations = [];

$locationsList = $('#locationsTarget');

// compile handlebars template
var source = $('#locations-template').html();
 template = Handlebars.compile(source);



$.ajax({
  method: 'GET',
  url: '/api/locations',
  success: handleGetAllSuccess,
  error: handleError
});


$("form").on("submit", function(event) {
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

$locationsList.on('click', '.deleteBtn', function() {
  $.ajax({
    method: 'DELETE',
    url: '/api/locations/'+$(this).attr('data-id'),
    success: deleteLocationSuccess,
    error: deleteLocationError
  });
});

function render () {
  // empty existing posts from view
  $locationsList.empty();
  // pass `allLocations` into the template function
  var locationsHtml = template({ locations: allLocations });
  console.log(locationsHtml);
  // append html to the view
  $locationsList.append(locationsHtml);
}


// success for GET ALL
function handleGetAllSuccess(taco) {
    allLocations = taco;
    console.log(allLocations);

    render();
// console.log("THIS TACO IS A : " , taco);
    // taco.forEach(function (element){
    //     render(element);
    // });
}
function deleteLocationSuccess(json) {
    var location = json;
    var locationId = location._id;

    // find the location with the correct ID and remove it from our allCities array
    for(var index = 0; index < allLocations.length; index++) {
      if(allLocations[index]._id === locationId) {
        allLocations.splice(index, 1);
        break;
      }
    }
    render(allLocations);

}

function handleSuccess(json) {
  allLocations = json;
  render();
}
function handlePostSuccess(json) {
    allLocation.unshift(json);
    render();
}

//General error handler
function handleError(e) {
  console.log('Ah, oops');
  $('#cityTarget').text('Failed to load cities, is the server working?');
}

function deleteLocationError(){
    console.log('oops the city wasnt deleted');
}









































// CREATE
//
// $('#album-form form').on('submit', function(e) {
//     e.preventDefault();
//     var formData = $(this).serialize();
//     console.log('formData', formData);
//     $.post('/api/albums', formData, function(album) {
//       console.log('album after POST', album);
//       renderAlbum(album);  //render the server's response
//     });
//     $(this).trigger("reset");
//   });
//
//
//
//
//   // UPDATE
//
//   //   $('#albums').on('click', '.add-song', function(e) {
//   //   var id= $(this).parents('.album').data('album-id');
//   //   console.log('id',id);
//   //   $('#songModal').data('album-id', id);
//   //   $('#songModal').modal();
//   // });
//   //
//   // $('#saveSong').on('click', handleNewSongSubmit);
//   //
//   // });
//
//
//   $locationsList = $('#locationsTarget');
//
//
//   $.ajax({
//     method: 'GET',
//     url: '/api/locations',
//     success: handleSuccess,
//     error: handleError
//   });
//
//   $('#newCityForm').on('submit', function(e) {
//     e.preventDefault();
//     $.ajax({
//       method: 'POST',
//       url: '/api/cities',
//       data: $(this).serialize(),
//       success: newCitySuccess,
//       error: newCityError
//     });
//   });
//
//   $citiesList.on('click', '.deleteBtn', function() {
//     $.ajax({
//       method: 'DELETE',
//       url: '/api/cities/'+$(this).attr('data-id'),
//       success: deleteCitySuccess,
//       error: deleteCityError
//     });
//   });
