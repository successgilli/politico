import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import passwordHash from 'password-hash';
import pdb from '../model/query';

dotenv.config();

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
        isAdmin,
      } = req.body;
      const hashedPassword = passwordHash.generate(password);
      const text = 'INSERT INTO users (firstName, lastName, hashedPassword, otherName, email, phoneNumber, passportUrl, isAdmin) values ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *';
      const param = [firstName, lastName, hashedPassword, otherName, email, phoneNumber, passportUrl, isAdmin];
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
            isAdmin: result.rows[0].isadmin,
          };
          console.log(result.rows[0].isadmin,'GERGER')
          jwt.sign(user, process.env.SECRETE_KEY, (err, token) =>{
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

  static login(req, res) {
    try {
      const {
        email,
        password,
      } = req.body;
      const text = 'SELECT * FROM users WHERE email = $1';
      const param = [email];
      pdb(text, param, (err, result) => {
        if (err) {
          console.log(err);
        } else if (result.rowCount === 0) {
          res.status(200).json('you have not registered yet');
        } else {
          // eslint-disable-next-line no-lonely-if]cinsl
          console.log(typeof result.rows[0].hashedpassword)
          console.log(password)
          if (passwordHash.verify(password, result.rows[0].hashedpassword)) {
            const user = {
              isAdmin: result.rows[0].isadmin,
            };
            console.log(result.rows[0].isadmin,'GERGER')
            jwt.sign(user, process.env.SECRETE_KEY, (err, token) =>{
              const response = {
                status: 200,
                data: [{
                  token,
                  user,
                }],
              };
              res.status(200).json(response);
            });
          } else {
            res.status(201).json('invalid password');
          }
        }
      });
    } catch (err) {
      console.log (err);
    }
  }

}

export default UserController;
