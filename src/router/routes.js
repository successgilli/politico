import express from 'express';
import CreatePary from '../controllers/partyController';
import ValidateParty from '../helpers/partyValidator';

const { validateParty } = ValidateParty; 
const { createParty } = CreatePary; 
const route = express.Router();
route.post('/parties', validateParty, createParty);

export default route;