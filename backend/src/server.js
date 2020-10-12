import express from 'express';
import bodyParser from 'body-parser';

const app = express();  //app object

app.use(bodyParser.json()); //parses json object and adds a body property to the req parameter.

app.get('/hello', (req, res) => res.send('Hello'));
app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}`));
app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}!!`));

app.listen(8000, () => console.log('Listening on port 8000'));  //argument to specify which port to listen on. then a callback
//that gets called once it connects.
