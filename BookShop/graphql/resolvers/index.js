const authResolver = require('./auth');
const eventsResolver = require('./events');
const shoppingResolver = require('./shopping');

const rootResolver = {
    ...authResolver,
    ...eventsResolver,
    ...shoppingResolver
};

module.exports = rootResolver;