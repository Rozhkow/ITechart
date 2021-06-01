module.exports = {
  MONGODB: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.accxh.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
  SECRET_KEY: "some very secret key",
  useNewUrlParser: true,
};
