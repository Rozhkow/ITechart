const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require('../../config');
const User = require('../../models/user');

const {
    validateRegisterInput,
    validateLoginInput
  } = require('../../middleware/validators');


function generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username
      },
      SECRET_KEY,
      { expiresIn: '1h' }
    );
  }

  module.exports = {
    getUser: async ({ userId }) => {
      try {
        const user = await User.findById(userId);
        if (user) {
          return user;
        } else {
          throw new Error('User not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    users: async () => {
      try {
          const users = await User.find();
          return users.map(user => {
              return user
          });
      } catch (err) {
      throw err;
      }
    },
    login: async ({ username, password }) => {
      const { errors } = validateLoginInput(username, password);

      if (username.trim() === '') {
        errors.username = 'Username must not be empty';
        throw new Error('Username must not be empty', { errors });
      }
      if (password.trim() === '') {
        errors.password = 'Password must not be empty';
        throw new Error('Password must not be empty', { errors });
      }

      const user = await User.findOne({ username });


      if (!user) {
        errors.general = 'User not found';
        throw new Error('User not found', { errors });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = 'Wrong crendetials';
        throw new Error('Wrong crendetials', { errors });
      }

      const token = generateToken(user);

      return {
        ...user._doc,
        id: user._id,
        admin: user._admin,
        token
      };
    },

    register: async ({registerInput: { username, email, password, confirmPassword }}) => {
      {
        // Validate user data
        const { valid, errors } = validateRegisterInput(
          username,
          email,
          password,
          confirmPassword
        );

        if (username.trim() === '') {
          errors.username = 'Username must not be empty';
          throw new Error('Username must not be empty', { errors });
        }

        if (email.trim() === '') {
          errors.email = 'Email must not be empty';
          throw new Error('Email must not be empty', { errors });
        } else {
          const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
          if (!email.match(regEx)) {
            errors.email = 'Email must be a valid email address';
            throw new Error('Email must be a valid email address', { errors });
          }
        }
        if (password === '') {
          errors.password = 'Password must not empty';
          throw new Error('Password must not empty', { errors });
        } else if (password !== confirmPassword) {
          errors.confirmPassword = 'Passwords must match';
          throw new Error('Passwords must match', { errors });
        }

        if (!valid) {
          throw new Error( {errors} );
        }
        // Make sure that user doesn't already exist
        const user = await User.findOne({ username });
        if (user) {
          throw new Error('Username is taken', {
            errors: {
              username: 'This username is taken'
            }
          });
        }
        // hash password and create an auth token
        password = await bcrypt.hash(password, 12);
  
        const newUser = new User({
          email,
          username,
          password,
          createdAt: new Date().toISOString()
        });
  
        const res = await newUser.save();
        
        const token = generateToken(res);
  
        return {
          ...res._doc,
          id: res._id,
          admin: res._admin,
          token
        };
      }
    }
  };

      