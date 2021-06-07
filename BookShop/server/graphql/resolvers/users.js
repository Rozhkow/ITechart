const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../../config");
const User = require("../../models/user");

const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../middleware/validators");

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
  deleteUser: async ({ userId }) => {
    try {
      const user = await User.findById(userId);
      // if (user.username === "admin") {
      await user.delete();
      return "User deleted successfully";
      // } else {
      //   throw new Error('Action not allowed');
      // }
    } catch (err) {
      throw new Error(err);
    }
  },
  getUser: async ({ userId }) => {
    try {
      const user = await User.findById(userId);
      if (user) {
        return user;
      } else {
        throw new Error("User not found");
      }
    } catch (err) {
      throw new Error(err);
    }
  },
  users: async () => {
    try {
      const users = await User.find();
      return users.map((user) => {
        return user;
      });
    } catch (err) {
      throw err;
    }
  },
  login: async ({ username, password }) => {
    const { errors } = validateLoginInput(username, password);

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
  },

  register: async ({
    registerInput: { username, email, password, confirmPassword },
  }) => {
    {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );

      if (!valid) {
        throw new Error({ errors });
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
    }
  },
};
