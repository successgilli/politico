import express from 'express';
import bodyParser from 'body-parser';
import route from './router/routes';


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', route);
app.listen(8080 || process.env.PORT, () => {
  console.log('listening on port 8080');
})
