import express from 'express';
import PartyController from '../controllers/partyController';
import PartyValidators from '../helpers/partyValidator';

const { validateCreateParty } = PartyValidators; 
const { createParty, getSpecificParty } = PartyController; 
const route = express.Router();
route.post('/parties', validateCreateParty, createParty);
route.get('/parties/:partyId', getSpecificParty);
export default route;