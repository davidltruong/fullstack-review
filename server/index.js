const express = require('express');
const bodyParser = require('body-parser');
const github = require('../helpers/github.js')
const saveDb = require('../database/index.js')
let app = express();

app.use(bodyParser());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  let username = (req.body.data);
  github.getReposByUsername(username, function(err, repos) {
    if (err === null) {
      var count = 0
      for (var i = 0; i < repos.length; i++) {
        count++;
        console.log(count)
        saveDb.save(repos[i]);
        if(count === repos.length) {
          res.end()
        }
      }
    } else {
      console.log('error github');
    }
  })
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/delete', function (req, res) {
  saveDb.delete();
  console.log('delete all repos from DB')
})

app.get('/repos', function (req, res) {
  saveDb.get(function(repos) {
    res.send(repos);
  });
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

