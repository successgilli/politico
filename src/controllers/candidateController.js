import pdb from '../model/query';

class CandidateController {
  static createCandidate(req, res) {
    const { candidateName } = req.body;
    const userId = parseInt(req.params.userId, 10);
    const officeId = parseInt(req.body.officeId, 10);
    const partyId = parseInt(req.body.partyId, 10);
    const candidateId = parseInt(req.body.candidateId, 10);
    const userQueryText = 'SELECT * FROM users WHERE id = $1';
    const userParam = [userId];
    pdb(userQueryText, userParam, (err, result) => {
      if (result.rowCount === 0) {
        res.status(400).json('no user');
      } else {
        const queryOffice = 'SELECT * FROM offices WHERE id = $1';
        const paramOffice = [officeId];
        pdb(queryOffice, paramOffice, (err, result) => {
          if (result.rowCount === 0) {
            res.status(400).json('no such office');
          } else {
            const text2 = 'INSERT INTO candidates (candidateName, userId, partyId, officeId, candidateId) VALUES ($1,$2,$3,$4,$5) RETURNING *';
            const param2 = [candidateName, userId, partyId, officeId, candidateId];
            pdb(text2, param2, (err, result) => {
              if (err) {
                if (err.detail === `Key (officeid, userid)=(${officeId}, ${userId}) already exists.`) {
                  res.json({
                    status: 401,
                    error: 'you already registered candidate',
                  });
                } else {
                  res.json({
                    status: 401,
                    error: err.message,
                  });
                }
              } else {
                res.json(result.rows[0]);
              }
            });
          }
        });
      }
    });
  }
}

export default CandidateController;
