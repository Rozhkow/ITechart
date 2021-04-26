const Event = require('../../models/event');
const Shopping = require('../../models/shopping');
const { transformShopping, transformEvent } = require('./merge');

module.exports = {
    shoppings: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
    try {
        const shoppings = await Shopping.find();
        return shoppings.map(shopping => {
            return transformShopping(shopping);
        });
    } catch (err) {
      throw err;
    }
    },
    shopEvent: async (args, req) => {
        if (!req.isAuth) {
        throw new Error('Unauthenticated!');
    }
    const fetchedEvent = await Event.findOne({ id: args.eventId });
    const shopping = new Shopping({
        user: req.userId,
        event: fetchedEvent
    });
    const result = await shopping.save();
    return transformShopping(result);
    },
    cancelShopping: async (args, req) => {
        if (!req.isAuth) {
            throw new Error('Unauthenticated!');
        }
    try {
        const shopping = await Shopping.findById(args.shoppingId).populate('event');
        const event = transformEvent(shopping.event);
        await Shopping.deleteOne({ id: args.shoppingId });
        return event;
    } catch (err) {
      throw err;
    }
    }
};