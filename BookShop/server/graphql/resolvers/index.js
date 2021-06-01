const eventsResolver = require("./events");
const usersResolvers = require("./users");

const rootResolver = {
  ...eventsResolver,
  ...usersResolvers,
};

module.exports = rootResolver;
