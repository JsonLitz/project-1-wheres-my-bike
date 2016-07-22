var db = require('./models');

var locations =[
    {
        streetOne: 'Jackson',
        streetTwo: 'Gough',
        noteToSelf: 'Right by the pizzeria you dummy',
    },
    {
        streetOne: 'Van Ness',
        streetTwo: 'Bush',
        noteToSelf: 'At bus stop you turd',
    },
    {
        streetOne: 'Polk',
        streetTwo: 'Clay',
        noteToSelf: 'By the donut shop ya moron',
    },
    {
        streetOne: 'Bush',
        streetTwo: 'Sansome',
        noteToSelf: 'In front of school, genius!',
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
      console.log("created " +  newLocations + " locations");

      process.exit();
    });
  }



});
