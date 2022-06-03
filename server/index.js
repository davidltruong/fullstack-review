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
      for (var i = 0; i < repos.length; i++) {
        saveDb.save(repos[i]);
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

app.get('/repos', function (req, res) {
  saveDb.get(function(repos) {
    repos.sort((a, b) => {
      return b.stargazers_count - a.stargazers_count;
    })
    repos = repos.slice(0, 25);
    res.send(repos);
  });
  // TODO - your code here!
  // This route should send back the top 25 repos
});

app.get('/', function (req, res) {
  console.log('test')
  saveDb.get(function(repos) {
    let topRepos = repos;
    topRepos.sort((a, b) => {
      return b.stargazers_count - a.stargazers_count;
    })
    topRepos = topRepos.slice(0, 25);
    let data = {repos: repos, topRepos: topRepos}
    res.end(data);
    // res.send(repos);
  });
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

