import express from 'express';
import PartyController from '../controllers/partyController';
import PartyValidators from '../helpers/partyValidator';
import OfficeController from '../controllers/officeController';
import OfficeValidators from '../helpers/officeValidator';

const { validateCreateParty, validateEditNameOfParty, validateDeleteParty } = PartyValidators; 
const { createParty, getSpecificParty, getAllParties, editPartyName, deletePartyName } = PartyController; 
const { validateCreateOffice } = OfficeValidators; 
const { createOffice, getAllOffices, getSpecificOffice, getAll, insertParty } = OfficeController; 
const route = express.Router();
route.post('/parties', validateCreateParty, createParty);
route.get('/parties/:partyId', getSpecificParty);
route.get('/parties/', getAllParties);
route.patch('/parties/:partyId/:name', validateEditNameOfParty, editPartyName);
route.delete('/parties/:partyId', validateDeleteParty, deletePartyName);
route.post('/offices', validateCreateOffice, createOffice);
route.get('/offices', getAllOffices);
route.get('/offices/:officeId', getSpecificOffice);
route.get('/user', getAll)
route.post('/insertParties', insertParty);
// challenge 2 completed

export default route;
