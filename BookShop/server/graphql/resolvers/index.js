const eventsResolver = require("./events");
const usersResolvers = require("./users");
const shoppingResolver = require("./shopping");

const rootResolver = {
  ...eventsResolver,
  ...usersResolvers,
  ...shoppingResolver,
};

module.exports = rootResolver;
