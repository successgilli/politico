
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
    //
    const errorKeyMessage = 'missing a name key';
    try {
      const keys = Object.keys(req.body);
      if (!(keys.includes('firstName')) || 
      !(keys.includes('lastName')) ||
      !(keys.includes('otherName')) ||
      !(keys.includes('email')) ||
      !(keys.includes('password')) ||
      !(keys.includes('passportUrl')) ||
      !(keys.includes('phoneNumber'))) {
        throw new Error(errorKeyMessage);
      }
      else if (firstName.trim() === '' || lastName.trim() === '' || otherName.trim() === ''
    || email.trim() === '' || password.trim() === '' || phoneNumber.trim() === ''
    || passportUrl.trim() === '') {
        throw new Error('no input field should be empty');
      } else if (!(email.trim().includes('@')) || !(email.trim().endsWith('.com'))) {
        throw new Error('improper email format');
      }
      else {
        next();
      }
    } catch (err) {
      const response = {
        status: 400,
        error: `${err} input should have firstName, lastName, otherName, email, password, phoneNumber, passportUrl`,
      };
      res.json(response);   
    }
    //
  }

  static validateUserlogin(req, res, next) {
    const {
      email,
      password,
    } = req.body;
    //
    const errorKeyMessage = 'missing a name key';
    try {
      const keys = Object.keys(req.body);
      if (!(keys.includes('email'))
      || !(keys.includes('password'))) {
        throw new Error(errorKeyMessage);
      } else if (email.trim() === '' || password.trim() === '') {
        throw new Error('no input field should be empty');
      } else if (!(email.trim().includes('@')) || !(email.trim().endsWith('.com'))) {
        throw new Error('improper email format');
      } else {
        next();
      }
    } catch (err) {
      const response = {
        status: 400,
        error: `${err} input should have firstName, lastName, otherName, email, password, phoneNumber, passportUrl`,
      };
      res.json(response);   
    }
    //
  }
}

export default UserValidators;
