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
const DoesNotCreate = require("../../middleware/validators");
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
      checkAuth(context);
      const user = await User.findById(id);
      if (user) {
        return user;
      } else {
        throw new DoesNotExist("User");
      }
    },
    async users() {
      const users = await User.find();
      if (users) {
        return users.map((user) => {
          return user;
        });
      } else {
        throw new DoesNotExist("Users");
      }
    },
  },
  Mutation: {
    async updateUser(_, args, context) {
      checkAuth(context);

      const { errors, valid } = validateUpdateUser(args.username, args.email);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = User.findOneAndUpdate(
        User.findById(args.id),
        {
          username: args.username,
          email: args.email,
        },
        { new: true }
      );
      if (user) {
        return user;
      } else {
        throw new DoesNotExist("User");
      }
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

    async login(_, { username, password }) {
      try {
        const { errors, valid } = validateLoginInput(username, password);

        if (!valid) {
          throw new UserInputError("Errors", { errors });
        }

        const user = await User.findOne({ username });

        if (!user) {
          errors.general = "User not found";
          throw new Error("User not found", { errors });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          errors.general = "Wrong crendetials";
          throw new Error("Wrong crendetials", { errors });
        }

        const token = generateToken(user);

        return {
          ...user._doc,
          id: user._id,
          token,
        };
      } catch (err) {
        throw err;
      }
    },

    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      try {
        // Validate user data
        const { valid, errors } = validateRegisterInput(
          username,
          email,
          password,
          confirmPassword
        );

        if (!valid) {
          throw new UserInputError("Errors", { errors });
        }
        // Make sure that user doesn't already exist
        const user = await User.findOne({ username });
        if (user) {
          throw new Error("Username is taken", {
            errors: {
              username: "This username is taken",
            },
          });
        }
        // hash password and create an auth token
        password = await bcrypt.hash(password, 12);

        const newUser = new User({
          email,
          username,
          password,
          createdAt: new Date().toISOString(),
        });

        const res = await newUser.save();

        const token = generateToken(res);

        return {
          ...res._doc,
          id: res._id,
          token,
        };
      } catch (err) {
        throw err;
      }
    },
  },
};
