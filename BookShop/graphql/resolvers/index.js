const eventsResolver = require('./events');
const usersResolvers = require('./users');



module.exports = {
    Mutation: {
        ...usersResolvers.Mutation
    }
};