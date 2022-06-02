const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (name, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${name}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios(options)
    .then(function(repos) {
      callback(null, repos.data);
      console.log('success github')
    })
    .catch(function(error) {
      console.log(`error getting ${name} from github api`)
    })
}

module.exports.getReposByUsername = getReposByUsername;