import express from 'express';
import PartyController from '../controllers/partyController';
import PartyValidators from '../helpers/partyValidator';

const { validateCreateParty, validateEditNameOfParty } = PartyValidators; 
const { createParty, getSpecificParty, getAllParties, editPartyName } = PartyController; 
const route = express.Router();
route.post('/parties', validateCreateParty, createParty);
route.get('/parties/:partyId', getSpecificParty);
route.get('/parties/', getAllParties);
route.patch('/parties/:partyId/:name', validateEditNameOfParty, editPartyName)

export default route;