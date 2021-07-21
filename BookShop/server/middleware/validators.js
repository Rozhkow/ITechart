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

module.exports.validateRegisterInput = (registerData) => {
  const errors = {};
  if (registerData.username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (registerData.email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!registerData.email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }
  if (registerData.password === "") {
    errors.password = "Password must not empty";
  } else if (registerData.password !== registerData.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (loginData) => {
  const errors = {};
  if (loginData.username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (loginData.password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCreateEvent = (goodData) => {
  const errors = {};
  if (goodData.title.trim() === "") {
    errors.title = "Title must not be empty";
  }
  if (goodData.description.trim() === "") {
    errors.description = "Description must not be empty";
  }
  if (goodData.price.trim() === "") {
    errors.price = "Price must not be empty";
  }
  if (goodData.autor.trim() === "") {
    errors.autor = "Autor must not be empty";
  }
  if (goodData.pageNumber.trim() === "") {
    errors.pageNumber = "PageNumber must not be empty";
  }
  if (goodData.publishYear.trim() === "") {
    errors.publishYear = "PublishYear must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateAddOrder = (orderData) => {
  const errors = {};
  // if (orderData.name.trim() === "") {
  //   errors.name = "Name must not be empty";
  // }
  // if (orderData.lastname.trim() === "") {
  //   errors.lastname = "Lastname must not be empty";
  // }
  // if (orderData.phoneNumber.trim() === "") {
  //   errors.phoneNumber = "PhoneNumber must not be empty";
  // }
  if (orderData.address.trim() === "") {
    errors.address = "Address must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateUpdateUser = (userData) => {
  const errors = {};
  if (userData.username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (userData.email.trim() === "") {
    errors.email = "E-mail must not be empty";
  }
  if (userData.name.trim() === "") {
    errors.name = "Name must not be empty";
  }
  if (userData.lastname.trim() === "") {
    errors.lastname = "Lastname must not be empty";
  }
  if (userData.phoneNumber.trim() === "") {
    errors.phoneNumber = "PhoneNumber must not be empty";
  } else {
    const regEx = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
    if (!userData.phoneNumber.match(regEx)) {
      errors.phoneNumber = "PhoneNumber must be a valid like +XXX(XX)XXX-XX-XX";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
