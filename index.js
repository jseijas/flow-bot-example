const BotManager = require('flow-bot-manager').default;
const restify = require('restify');
const FlowConnectorSlack = require('flow-connector').FlowConnectorSlack;

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

var opts = {
  defaultLocale: 'en',
  localesPath: './bot/locales',
  cardPath: './bot/cards',
  actionPath: './bot/actions',
  dialogPath: './bot/dialogs'
};

var slack = new FlowConnectorSlack({
  botToken: process.env.BOT_SLACK_TOKEN
});

server.botManager = new BotManager(opts);
server.botManager.connector.addConnector('slack', slack);
server.post('/api/messages', server.botManager.connector.listen());