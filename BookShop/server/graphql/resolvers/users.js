const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../../config");
const User = require("../../models/user");

const { UserInputError } = require("apollo-server");

const checkAuth = require("../../middleware/is-auth");

const {
  validateRegisterInput,
  validateLoginInput,
  validateUpdateUser,
} = require("../../middleware/validators");

const DoesNotExist = require("../../middleware/validators");
const ReceivePermission = require("../../middleware/validators");

function generateToken(user) {
  // Returns the JsonWebToken as string
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      admin: user.admin,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Query: {
    async getUser(_, { id }, context) {
      // checkAuth(context);

      const user = await User.findById(id);
      if (!user) {
        throw new DoesNotExist("User");
      }
      return user;
    },
    async users() {
      checkAuth(context);

      const users = await User.find();
      if (!users) {
        throw new DoesNotExist("Users");
      }
      return users.map((user) => {
        return user;
      });
    },
  },
  Mutation: {
    async updateUser(_, userData, context) {
      checkAuth(context);

      const { errors, valid } = validateUpdateUser(userData);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = User.findOneAndUpdate(
        User.findById(userData.id),
        {
          ...userData,
        },
        { new: true }
      );
      if (!user) {
        throw new DoesNotExist("User");
      }
      return user;
    },
    async deleteUser(_, { id }, context) {
      const { username } = checkAuth(context);

      if (username !== "admin") {
        throw new ReceivePermission("Delete");
      }
      const user = await User.findById(id);
      if (!user) {
        throw new DoesNotExist("User");
      }
      await user.delete();
      return "User deleted successfully";
    },

    async login(_, args) {
      const { errors, valid } = validateLoginInput(args);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ username: args.username });

      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("Errors", { errors });
      }

      const match = await bcrypt.compare(args.password, user.password);
      if (!match) {
        errors.general = "Wrong crendetials";
        throw new UserInputError("Errors", { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    async register(_, { registerInput }) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(registerInput);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // Make sure that user doesn't already exist
      const user = await User.findOne({ username: registerInput.username });
      if (user) {
        errors.general = "Username is taken";
        throw new UserInputError("Errors", {
          errors: {
            username: "This username is taken",
          },
        });
      }
      // hash password and create an auth token
      password = await bcrypt.hash(registerInput.password, 12);

      const newUser = new User({
        ...registerInput,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
};
