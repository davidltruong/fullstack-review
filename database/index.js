const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  name: String,
  owner: String,
  stargazers_count: Number,
  git_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  for (var i = 0; i < repos.length; i++) {
    var test = Repo.find({name: repos[i].name}, function(err, arr) {
      if (err) {
        var repo = new Repo({
          name: repos[i].name,
          owner: repos[i].owner.login,
          stargazers_count: repos[i].stargazers_count,
          git_url: repos[i].html_url
        })
      } else if (arr) {
        console.log('duplicate')
      }
    })

  }
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;