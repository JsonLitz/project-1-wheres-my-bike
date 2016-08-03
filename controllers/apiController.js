function index(req, res) {
  res.json({
    message: "Welcome to Where's my Bike!",
    documentation_url: "https://github.com/JsonLitz/project-1-wheres-my-bike/blob/master/README.md",
    base_url: "https://murmuring-wave-47459.herokuapp.com/",
    endpoints: [
      // Nice documentation! TODO: Remember to fill out all of your endpoints, if you're going to include this
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

module.exports.index = index;
