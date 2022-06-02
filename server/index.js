const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js')
const saveDb = require('../database/index.js')
let app = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  let username = (req.body.data)
  github.getReposByUsername(username, function(err, repos) {
    if (err === null) {
      saveDb.save(repos);
      console.log('saved in db')
    }
  })
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

