
class CandidateValidators {

  static validateCandidate(req, res, next) {
    const { candidateName } = req.body;
    const userId = parseInt(req.params.userId, 10);
    const officeId = parseInt(req.body.officeId, 10);
    const partyId = parseInt(req.body.partyId, 10);
    const candidateId = parseInt(req.body.candidateId, 10);
    //
    const errorKeyMessage = 'missing a name key';
    try {
      const keys = Object.keys(req.body);
      if (!(keys.includes('candidateName'))
            || !(keys.includes('officeId'))
            || !(keys.includes('partyId'))
            || !(keys.includes('candidateId'))) {
        throw new Error(errorKeyMessage);
      } else if (isNaN(req.params.userId) || isNaN(req.body.officeId)
            || isNaN(req.body.partyId) || isNaN(req.body.candidateId)) {
        throw new ('input must be number ...userId, officeId, candiateId')();
      } else if (candidateName === '' || officeId === '' || userId === ''
          || partyId === '' || candidateId === '') {
        throw new Error('no input field should be empty');
      } else if (isNaN(partyId)
      || isNaN(officeId)
      || isNaN(candidateId)) {
        throw new Error('inputs should be numbers ..partyId, officeId, candidateId');
      } else {
        next();
      }
    } catch (err) {
      const response = {
        status: 400,
        error: `${err} `,
      };
      res.json(response);   
    }
    //
  }

}

export default CandidateValidators;
