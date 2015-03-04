var _ = require('lodash');
var endpoint = require('apis-endpoint')();
var request = require('request');

module.exports = endpoint;

/**
 * Get the maintainers of the project.
 */
endpoint.get('/maintainers/', function(req, res, fail) {
  var options = {
    url: 'https://api.github.com/orgs/apis-is/public_members',
    headers: {
      'User-Agent': 'apis-is'
    }
  };

  request.get(options, function(err, response, body) {
    if (err) return res.json({error: err});

    var maintainers = _.map(JSON.parse(body), function(n) {
      return _.pick(n, ['login', 'avatar_url', 'url']);
    });

    return res.json(maintainers);
  });
});

/**
 * Get a list of all contributors to the project.
 */
endpoint.get('/contributors/', function(req, res, fail) {
  var options = {
    url: 'https://api.github.com/repos/apis-is/apis/contributors',
    headers: {
      'User-Agent': 'apis-is'
    }
  };

  request.get(options, function(err, response, body) {
    if (err) return res.json({error: err});

    var maintainers = _.map(JSON.parse(body), function(n) {
      return _.pick(n, ['login', 'avatar_url', 'url', 'contributions']);
    });

    return res.json(maintainers);
  });
});

/**
 * Get a list of official sponsors of the project.
 */
endpoint.get('/sponsors/', function(req, res, fail) {
  return res.json({
      'nosponsors': 'No sponsors yet! Contact us at apis@apis.is if you\'re interested!'
    });
});
