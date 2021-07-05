const eventsResolver = require("./events");
const usersResolvers = require("./users");
const shoppingResolver = require("./shopping");
const commentsResolvers = require("./comments");
const ordersResolvers = require("./order");

module.exports = {
  Query: {
    ...eventsResolver.Query,
    ...usersResolvers.Query,
    ...shoppingResolver.Query,
    ...ordersResolvers.Query,
  },
  Mutation: {
    ...eventsResolver.Mutation,
    ...usersResolvers.Mutation,
    ...shoppingResolver.Mutation,
    ...commentsResolvers.Mutation,
    ...ordersResolvers.Mutation,
  },
  Event: { commentCount: (parent) => parent.comments.length },
};
