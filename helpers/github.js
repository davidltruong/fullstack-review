const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (name) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    url: `http;//api.github.com/ + ${name} + /repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios.get(options)
    .then(function(repos) {
      console.log('success github')
    })
    .catch(function(error) {
      console.log('error')
    })
}

module.exports.getReposByUsername = getReposByUsername;