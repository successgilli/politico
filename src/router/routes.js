import express from 'express';
import PartyController from '../controllers/partyController';
import PartyValidators from '../helpers/partyValidator';
import OfficeController from '../controllers/officeController';
import OfficeValidators from '../helpers/officeValidator';

const { validateCreateParty, validateEditNameOfParty, validateDeleteParty } = PartyValidators; 
const { createParty, getSpecificParty, getAllParties, editPartyName, deletePartyName } = PartyController; 
const { validateCreateOffice } = OfficeValidators; 
const { createOffice } = OfficeController; 
const route = express.Router();
route.post('/parties', validateCreateParty, createParty);
route.get('/parties/:partyId', getSpecificParty);
route.get('/parties/', getAllParties);
route.patch('/parties/:partyId/:name', validateEditNameOfParty, editPartyName);
route.delete('/parties/:partyId', validateDeleteParty, deletePartyName);
route.post('/offices', validateCreateOffice, createOffice);

export default route;