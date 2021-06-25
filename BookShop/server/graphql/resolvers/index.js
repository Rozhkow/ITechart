const eventsResolver = require("./events");
const usersResolvers = require("./users");
const shoppingResolver = require("./shopping");
const commentsResolvers = require("./comments");

module.exports = {
  Query: {
    ...eventsResolver.Query,
    ...usersResolvers.Query,
    ...shoppingResolver.Query,
  },
  Mutation: {
    ...eventsResolver.Mutation,
    ...usersResolvers.Mutation,
    ...shoppingResolver.Mutation,
    ...commentsResolvers.Mutation,
  },
  Event: { commentCount: (parent) => parent.comments.length },
};
