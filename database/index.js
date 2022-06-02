const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  name: String,
  owner: String,
  stargazers_count: Number,
  git_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  for (var i = 0; i < repos.length; i++) {
    Repo.find({name: repos[i].name}, function(err, arr) {
      if (arr.length === 0) {
        var repo = new Repo({
          name: repos[i].name,
          owner: repos[i].owner.login,
          stargazers_count: repos[i].stargazers_count,
          git_url: repos[i].html_url
        })
        repo.save(function(err, doc) {
          if(err) {
            return console.error(err)
          }
        });
      } else {
        console.log('duplicate')
      }
    })
  }
  // console.log('list', Repo.find({}))
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;