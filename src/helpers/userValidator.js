
class UserValidators {
  // eslint-disable-next-line class-methods-use-this
  static validateUserSignup(req, res, next) {
    const {
      firstName,
      lastName,
      otherName,
      email,
      password,
      phoneNumber,
      passportUrl,
    } = req.body;
    if (firstName.trim() === '' || lastName.trim() === '' || otherName.trim() === ''
    || email.trim() === '' || password.trim() === '' || phoneNumber.trim() === ''
    || passportUrl.trim() === '') {
      res.status(400).json('no input field should be empty');
    } else {
      next();
    }
  }

  static validateUserlogin(req, res, next) {
    const {
      email,
      password,
    } = req.body;
    if (email.trim() === '' || password.trim() === '') {
      res.status(400).json('no input field should be empty');
    } else {
      next();
    }
  }
}

export default UserValidators;
