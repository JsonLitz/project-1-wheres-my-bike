var db = require('./models');

var locations =[
    {
        streetOne: 'Jackson',
        streetTwo: 'Gough',
        noteToSelf: 'Right by the pizzeria ',
    },
    {
        streetOne: 'Van Ness',
        streetTwo: 'Bush',
        noteToSelf: 'At bus stop ',
    },
    {
        streetOne: 'Polk',
        streetTwo: 'Clay',
        noteToSelf: 'By the donut shop ',
    },
    {
        streetOne: 'Bush',
        streetTwo: 'Sansome',
        noteToSelf: 'In front of school!',
    }
];

db.Location.remove({}, function(err, location) {
  if (err) {
    console.log('Error occurred in remove', err);
    return;
  } else {
    console.log('removed all locations');
    db.Location.create(locations, function(err, newLocations){
      if (err) {
         console.log('err', err);
      }
      //TODO: Should this be newLocations.length or do you want to see a list of all newly seeded locations?
      console.log("created " +  newLocations + " locations");
      process.exit();
    });
  }
});
