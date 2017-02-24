const FlowStorage = require('flow-storage').FlowStorage;
const LoopbackCollection = require('flow-storage').LoopbackCollection;
const BotManager = require('flow-bot-manager').default;
const winston = require('winston');

function createStorage(server) {
  var opts = {
    collectionClass: LoopbackCollection,
    collectionSettings: {
      model: server.models.Variable
    }
  };
  return new FlowStorage(opts);
}

module.exports = function(server) {
  var storage = createStorage(server);

  var opts = {
    storage: storage,
    logger: winston,
    defaultLocale: 'en',
    localesPath: './bot/locales',
    cardPath: './bot/cards',
    actionPath: './bot/actions',
    dialogPath: './bot/dialogs'
  };

  server.botManager = new BotManager(opts);
  server.post('/api/messages', server.botManager.connector.listen());
};

