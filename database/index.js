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
      var newRepo = new Repo ({
        id: repo.id,
        name: repo.name,
        owner: repo.owner.login,
        stargazers_count: repo.stargazers_count,
        git_url: repo.html_url
      })
      newRepo.save();
      console.log('Added ' + repo.name);
    } else {
      console.log('duplicate');
    }
  })
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

let get = (callback) => {
  Repo.find({}, function(err, arr) {
    if (arr.length > 0) {
       callback(arr);
    } else {
      console.log('no repos in db')
      callback([]);
    }
  })
}

module.exports.save = save;
module.exports.get = get;