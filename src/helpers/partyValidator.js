class ValidateParty {
  static validateParty(req, res, next) {
    const errorKeyMessage = 'missing a name key';
    try {
      const keys = Object.keys(req.body);
      const lowerKeys = []; 
      keys.forEach(x => lowerKeys.push(x.toLowerCase()) )
      if (!(lowerKeys.includes('name')) || !(lowerKeys.includes('hqaddress')) || !(lowerKeys.includes('logourl'))) {
        throw new Error(errorKeyMessage);
      } else {
        next();
      }
    }
    catch (err) {
      const response = {
        status: 400,
        error: errorKeyMessage
      };
      res.json(response);   
    }
  }
}

export default ValidateParty;