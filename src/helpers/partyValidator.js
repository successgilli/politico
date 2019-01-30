class ValidateParty {
  static validateParty(req, res, next) {
    const errorKeyMessage = 'missing a name key';
    try {
      if (!('name' in req.body) || !('hqAddress' in req.body) || !('logoURL' in req.body)) {
        throw new Error(errorKeyMessage);
      }
    }
    catch (err) {
      console.log (err);
      const response = {
        status: 400,
        error: errorKeyMessage
      };
      res.json(response);   
    }
    next();
  }
}

export default ValidateParty;