import db from '../model/db';

const counter = 1;
class PartyController {
  static createParty(req, res) {
    let name;
    let hqAddress;
    let logoUrl;
    const keys = Object.keys(req.body); 
    keys.forEach(keyFromUser => { 
      
      if(keyFromUser.toLowerCase() === 'name'){
        name = req.body[keyFromUser];
      }
      if(keyFromUser.toLowerCase() === 'hqaddress'){
        hqAddress = req.body[keyFromUser];
      }
      if(keyFromUser.toLowerCase() === 'logourl')
        logoUrl = req.body[keyFromUser];
    } )
    let random = Math.floor((Math.random() * 100000) + counter);
    let party = {
      id: random,
      name,
      hqAddress,
      logoUrl 
    }   
    db.push(party);
    const response = {
      status: 200,
      data: [{ id: db[db.length - 1].id, name: db[db.length - 1].name }]
    }
    console.log(db);
    res.json(response);
  }

  static getSpecificParty(req, res) {
    let partyIndex = 'notFound';
    const errorResponse = {
      status: 400,
      error: 'Party not found'
    };
    db.forEach((eachPartyInDb, index) => {
      console.log('start ',eachPartyInDb);
      console.log(eachPartyInDb.id);
      console.log('end', req.params.partyId);
      if (eachPartyInDb.id === (parseInt(req.params.partyId,10))) {
        partyIndex = index;
      }
    })
  
    if ( isNaN(req.params.partyId) || !db[partyIndex] ){
      res.json(errorResponse);
    }
    else if ( parseInt(req.params.partyId, 10) === db[partyIndex].id) {
      const response = {
        status: 200,
        data: [{ id: db[partyIndex].id,
          name: db[partyIndex].name,
          logoUrl: db[partyIndex].logoUrl
        }
        ]
      }
      res.json(response)
    }
    else {
      res.json(errorResponse);
    }
  }
}
export default PartyController;