module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
    throw new Error("Username must not be empty", { errors });
  }
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
    throw new Error("Email must not be empty", { errors });
  } else {
    const regEx =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
      throw new Error("Email must be a valid email address", { errors });
    }
  }
  if (password === "") {
    errors.password = "Password must not empty";
    throw new Error("Password must not empty", { errors });
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
    throw new Error("Passwords must match", { errors });
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
    throw new Error("Username must not be empty", { errors });
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
    throw new Error("Password must not be empty", { errors });
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateCreateEvent = (
  title,
  description,
  price,
  autor,
  pageNumber,
  publishYear
) => {
  const errors = {};
  if (title.trim() === "") {
    errors.title = "Title must not be empty";
    throw new Error("Title must not be empty", { errors });
  }
  if (description.trim() === "") {
    errors.description = "Description must not be empty";
    throw new Error("Description must not be empty", { errors });
  }
  if (price.trim() === "") {
    errors.price = "Price must not be empty";
    throw new Error("Price must not be empty", { errors });
  }
  if (autor.trim() === "") {
    errors.autor = "Autor must not be empty";
    throw new Error("Autor must not be empty", { errors });
  }
  if (pageNumber.trim() === "") {
    errors.pageNumber = "PageNumber must not be empty";
    throw new Error("PageNumber must not be empty", { errors });
  }
  if (publishYear.trim() === "") {
    errors.publishYear = "PublishYear must not be empty";
    throw new Error("PublishYear must not be empty", { errors });
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateAddOrder = (name, lastname, address) => {
  const errors = {};
  if (name.trim() === "") {
    errors.name = "Name must not be empty";
    throw new Error("Name must not be empty", { errors });
  }
  if (lastname.trim() === "") {
    errors.lastname = "Lastname must not be empty";
    throw new Error("Lastname must not be empty", { errors });
  }
  if (address.trim() === "") {
    errors.address = "Address must not be empty";
    throw new Error("Address must not be empty", { errors });
  }

  return {
    errors,
  };
};
