class PartyValidators {
  // create party
  static validateCreateParty(req, res, next) {
    const errorKeyMessage = 'missing a name key';
    try {
      const keys = Object.keys(req.body);
      const lowerKeys = []; 
      keys.forEach(x => lowerKeys.push(x.toLowerCase()) )
      if (!(lowerKeys.includes('name')) || 
      !(lowerKeys.includes('hqaddress')) ||
      !(lowerKeys.includes('logourl'))) {
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
// edit party
  static validateEditNameOfParty(req, res, next) {
    let checkFailure = 'false';
    let response;
    if ( isNaN(req.params.partyId) ) {
      response = {
        status: 400,
        error: 'id invalid'
      };
      checkFailure = 'true';
    }
    else if (!Number.isInteger(Number(req.params.partyId))){
      response = {
        status: 400,
        error: 'id should be integer number'
      };
      checkFailure = 'true';    
    }
    else if (typeof req.params.name === 'string' ){
      for (let i=0; i<req.params.name.length; i++) {
        if ( !isNaN(parseInt(req.params.name.charAt(i), 10))) {
          response = {
            status: 400,
            error: 'name should be only string'
          };
          checkFailure = 'true';
        }
      }
    }
    
    if (checkFailure === 'true'){
      
      res.status(400).json(response);
    }
    else {
      next();
    }   
  }
  // delete party
  static validateDeleteParty(req, res, next) {
    let checkFailure = 'false';
    let response;
    if ( isNaN(req.params.partyId) ) {
      response = {
        status: 400,
        error: 'id invalid'
      };
      checkFailure = 'true';
    }
    else if (!Number.isInteger(Number(req.params.partyId))){
      response = {
        status: 400,
        error: 'id should be integer number'
      };
      checkFailure = 'true';    
    }
    else if (typeof req.params.name === 'string' ){
      for (let i=0; i<req.params.name.length; i++) {
        if ( !isNaN(parseInt(req.params.name.charAt(i), 10))) {
          response = {
            status: 400,
            error: 'name should be only string'
          };
          checkFailure = 'true';
        }
      }
    }
    
    if (checkFailure === 'true'){
      
      res.status(400).json(response);
    }
    else {
      next();
    }
  }

}

export default PartyValidators;