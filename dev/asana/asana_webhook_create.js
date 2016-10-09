const request = require('request');
const asanaConfig = require('../api/asana/asana.config');

request.post({
  url: 'https://app.asana.com/api/1.0/webhooks',
  headers: {
    Authorization: `Bearer ${asanaConfig.personalAccessToken}`
  },
  form: {
    // resource:
  }
})
