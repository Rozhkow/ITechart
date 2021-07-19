class DoesNotExist extends Error {
  constructor(entity) {
    super();
    this.name = "EntityError";
    this.entity = entity;
    this.message = entity + " doesn't exist.";
  }
}

class DoesNotCreate extends Error {
  constructor(entity) {
    super();
    this.name = "EntityError";
    this.entity = entity;
    this.message = entity + " didn't create.";
  }
}

class ReceivePermission extends Error {
  constructor(action) {
    super();
    this.name = "PermissionError";
    this.action = action;
    this.message = "You don't have any permissions to " + action;
  }
}

module.exports = DoesNotExist;
module.exports = DoesNotCreate;
module.exports = ReceivePermission;

module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (password === "") {
    errors.password = "Password must not empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCreateEvent = (args) => {
  const errors = {};
  if (args.title.trim() === "") {
    errors.title = "Title must not be empty";
  }
  if (args.description.trim() === "") {
    errors.description = "Description must not be empty";
  }
  if (args.price.trim() === "") {
    errors.price = "Price must not be empty";
  }
  if (args.autor.trim() === "") {
    errors.autor = "Autor must not be empty";
  }
  if (args.pageNumber.trim() === "") {
    errors.pageNumber = "PageNumber must not be empty";
  }
  if (args.publishYear.trim() === "") {
    errors.publishYear = "PublishYear must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateAddOrder = (args) => {
  const errors = {};
  if (args.name.trim() === "") {
    errors.name = "Name must not be empty";
  }
  if (args.lastname.trim() === "") {
    errors.lastname = "Lastname must not be empty";
  }
  if (args.address.trim() === "") {
    errors.address = "Address must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateUpdateUser = (username, email) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "E-mail must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
