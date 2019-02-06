import jwt from 'jsonwebtoken';
import passwordHash from 'password-hash';
import pdb from '../model/query';


class UserController {
  static signUp(req, res) {
    try {
      const {
        firstName,
        lastName,
        otherName,
        email,
        password,
        phoneNumber,
        passportUrl,
      } = req.body;
      const hashedPassword = passwordHash.generate(password);
      const text = 'INSERT INTO users (firstName, lastName, hashedPassword, otherName, email, phoneNumber, passportUrl) values ($1,$2,$3,$4,$5,$6,$7) RETURNING *';
      const param = [firstName, lastName, hashedPassword, otherName, email, phoneNumber, passportUrl];
      pdb(text, param, (err, result) => {
        if (err) {
          if (err.detail === `Key (email)=(${email}) already exists.`) {
            res.json({
              status: 401,
              error: 'email already taken'
            });
          } else {
            console.log(err);
          }

        }
        if (result) {
          const user = {
            firstname: result.rows[0].firstname,
            email: result.rows[0].email,
            id: result.rows[0].id,
          };
          jwt.sign({ user }, 'secretekey', (err, token) =>{
            const response = {
              status: 200,
              data: [{
                token,
                user,
              }],
            };
            res.status(200).json(response);
          });
        }
      });
    } catch (err) {
      console.log (err);
    }
  }

}

export default UserController;
