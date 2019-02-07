import express from 'express';
import jwt from 'jsonwebtoken';
import PartyController from '../controllers/partyController';
import PartyValidators from '../helpers/partyValidator';
import UserValidator from '../helpers/userValidator';
import OfficeController from '../controllers/officeController';
import OfficeValidators from '../helpers/officeValidator';
import UserController from '../controllers/userController';
import verifyToken from '../helpers/userAuth';
import CandidateController from '../controllers/candidateController';
import CandidateValidators from '../helpers/candidateValidator';


const { validateCreateParty, validateEditNameOfParty, validateDeleteParty } = PartyValidators; 
const { createParty, getSpecificParty, getAllParties, editPartyName, deletePartyName } = PartyController; 
const { validateCreateOffice } = OfficeValidators; 
const { createOffice, getAllOffices, getSpecificOffice } = OfficeController;
const { signUp, login } = UserController;
const { validateUserSignup, validateUserlogin } = UserValidator;
const { createCandidate } = CandidateController;
const { validateCandidate } = CandidateValidators;
const route = express.Router();
route.post('/parties', validateCreateParty, createParty);
route.get('/parties/:partyId', getSpecificParty);
route.get('/parties/', getAllParties);
route.patch('/parties/:partyId/:name', validateEditNameOfParty, editPartyName);
route.delete('/parties/:partyId', validateDeleteParty, deletePartyName);
route.post('/offices', validateCreateOffice, verifyToken, createOffice);
route.get('/offices', getAllOffices);
route.get('/offices/:officeId', getSpecificOffice);
route.post('/auth/signup', validateUserSignup, signUp);
route.post('/auth/login', validateUserlogin, login);
route.post('/office/:userId/register', validateCandidate, createCandidate);
// challenge 2 completed

export default route;
