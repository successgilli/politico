class OfficeValidators {
  // create party
  static validateCreateOffice(req, res, next) {
    const errorKeyMessage = 'missing a name key';
    try {
      const keys = Object.keys(req.body);
      const lowerKeys = []; 
      keys.forEach(x => lowerKeys.push(x.toLowerCase()) )  
      if (!(lowerKeys.includes('type')) ||
        !(lowerKeys.includes('name'))) {
        throw new Error(errorKeyMessage);
      } 
      else {
        next();
      }
    }
    catch (err) {
      const response = {
        status: 400,
        error: err.message
      };
      res.json(response);   
    }
  }
} 
export default OfficeValidators;
