const eventsResolver = require("./events");
const usersResolvers = require("./users");
const shoppingResolver = require("./shopping");
const commentsResolvers = require("./comments");

const rootResolver = {
  ...eventsResolver,
  ...usersResolvers,
  ...shoppingResolver,
  ...commentsResolvers,
};

module.exports = rootResolver;
