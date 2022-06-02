const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  owner: String,
  stargazers_count: Number,
  git_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  Repo.find({id: repo.id}, function(err, arr) {
    if (arr.length === 0) {
      console.log('not found')
      var newRepo = new Repo ({
        id: repo.id,
        name: repo.name,
        owner: repo.owner.login,
        stargazers_count: repo.stargazers_count,
        git_url: repo.html_url
      })
      newRepo.save();
    } else {
      console.log('duplicate', arr)
    }
  })
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;