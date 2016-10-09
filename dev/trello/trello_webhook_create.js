const request = require('request');
const config = require('../../api/trello/trello.config');

request.post({
  url: `https://api.trello.com/1/tokens/${config.token}/webhooks/?key=${config.key}`,
  form: Object.assign({}, config.webhook, {
    callbackURL: `${process.argv[2]}/trello/webhook`
  })
}, (err, response, body) => {
  if (err) {
    console.log('[trello_webhook_create] error creating trello webhook: ', err);
    return;
  }
  console.log('[trello_webhook_create] successfully created trello webhook: ', response);
})
