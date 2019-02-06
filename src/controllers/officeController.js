import pdb from '../model/query';

class OfficeController {
  // create office
  static createOffice(req, res) {
   /* if (req.userData !== true) {
      res.status(401).json('unauthorised');
    }*/
    const { name, type } = req.body;
    const text = 'INSERT INTO offices (name, type) VALUES ($1,$2) RETURNING *';
    const param = [name, type];
    pdb(text, param, (err, result) => {
      if (err) {
        throw err;
      }
      const response = {
        status: 200,
        data: [{ id: result.rows[0].id, name: result.rows[0].name, type: result.rows[0].type }]
      }
      res.status(200).json(response);
    })
}

  // get all offices
  static getAllOffices(req, res) {
    const text = 'SELECT * FROM offices ';
    pdb(text, (err, result) => {
      if (err) {
        throw err;
      }
      const response = {
        status: 200,
        data: result.rows
      }
      res.status(200).json(response);
    })
  }

  // for get specific office route
  static getSpecificOffice(req, res) {
    const text = 'SELECT * FROM offices WHERE id = $1';
    const param = [req.params.officeId];
    pdb(text, param, (err, result) => {
      if (err) {
        throw error;
      }
      const response = {
        status: 200,
        data: [{ id: result.rows[0].id, name: result.rows[0].name, type: result.rows[0].type }]
      }
      res.status(200).json(response);
    })
  }
}

export default OfficeController;
