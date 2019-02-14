import pdb from '../model/query';

class PartyController {
  // create party
  static createParty(req, res) {
    const { name, logoUrl, hqAddress } = req.body;
    const text = 'INSERT INTO parties (name, hqAddress, logoUrl) VALUES ($1,$2,$3) RETURNING *';
    const param = [name, hqAddress, logoUrl];
    pdb(text, param, (err, result) => {
      if (err) {
        throw err;
      }
      const response = {
        status: 200,
        data: [{id: result.rows[0].id, name: result.rows[0].name } ]
      };
      res.status(200).json(response);
    });  
  }

  // for get specific party route
  static getSpecificParty(req, res) {
    const text = 'SELECT * FROM parties WHERE id = $1';
    const param = [req.params.partyId];
    pdb(text, param, (err, results ) => {
      if (err) {
        throw err;
      }
      else if (!results.rows[0]) {
        const response = {
          status: 400,
          error: 'party not found',
        };
        res.status(200).json(response);
      }
      if (results.rows[0]) {
        console.log(results)
        const response = {
          status: 200,
          data: [ {id: results.rows[0].id, name: results.rows[0].name, logoUrl: results.rows[0].logourl }]
        }
        res.status(200).json(response);
      }
    })
  }
  // get all parties

  static getAllParties(req, res) {
    const text = 'SELECT * FROM parties ';
    pdb(text, (err, result) => {
      if (err) {
        const response = {
          status: 400,
          error: err.message,
        };
        res.status(400).json(response);
      } else {
        const response = {
          status: 200,
          data: result.rows,
        };
        res.status(200).json(response);
      }
    });
  }

  // edit party name
  static editPartyName(req, res) {
    const text = 'UPDATE parties SET name = $1 WHERE id = $2 RETURNING *';
    const param = [req.params.name, req.params.partyId];
    pdb(text, param, (err, result) => {
      if (err) {
        const response = {
          status: 400,
          error: err.message,
        }
        res.status(400).json(response);
      }
      else if (result.rows[0]) {
        const response = {
          status: 200,
          data: [{ id: result.rows[0].id, name: result.rows[0].name }],
        };
        res.status(200).json(response);
      }
      else {
        const response = {
          status: 400,
          error: 'id not found',
        };
        res.status(400).json(response);
      }
    });
  }

  // delete party
  static deletePartyName(req, res) {
    const text = 'DELETE FROM parties WHERE id = $1 RETURNING *';
    const param = [req.params.partyId];
    pdb(text, param, (err, result) => {
      if (err) {
        const response = {
          status: 400,
          error: err.message,
        };
        res.status(400).json(response);
      } else if (result.rows[0]) {
        const response = {
          status: 200,
          data: [{ message: 'successfully deleted' }],
        };
        res.status(200).json(response);
      } else {
        const response = {
          status: 400,
          error: 'party not found',
        };
        res.status(400).json(response);
      }
    });
  }
}
export default PartyController;
