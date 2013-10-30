var express = require('express');
var pg = require('pg');
var connString = process.env.HEROKU_POSTGRESQL_BRONZE_URL;
pg.connect(conString, function(err, client, done) {
  var app = express();
  app.use(express.json());
  app.get('/', function(req, res){
    res.send('These aren\'t the droids you are looking for.');
  });
  app.post("/blessing.json", function (req, res) {
    var data = req.body;
    client.query("insert into blessed (pkg, created_at) VALUES ($1, NOW());", [JSON.stringify(data)], function (err, results) {
      req.send("OK");
    });
  });
  app.listen(process.env.PORT || 3000);
});

