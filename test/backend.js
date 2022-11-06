const express = require('express');

const app = express();

app.set('port', 3000);
app.use(express.json());
app.use((req, res, next) => {
  // console.log(req);
  next();
});

app.get('/', (req, res) => {
  console.log(req.method);
  // console.log(req.body);
  // console.log(req.headers);
  res.statusCode = 200;
  res.send({ response: 'Response get method is OK' });
});

app.post('/', (req, res) => {
  console.log(req.method);
  // console.log(req);
  res.send({ response: 'Response post is OK' });
});

app.put('/', (req, res) => {
  console.log(req.method);
  res.send({ response: 'Response put is OK' });
});

app.patch('/', (req, res) => {
  console.log(req.method);
  res.send({ response: 'Response patch is OK' });
});

app.delete('/', (req, res) => {
  console.log(req.method);
  res.send({ response: 'Response delete is OK' });
});

//= ==

// eslint-disable-next-line no-unused-vars
app.post('/timeout', (req, res) => {
  console.log('Request is OK');
  // No response;
});

app.post('/auth/basic', (req, res) => {
  let message;
  if (req.headers.authorization.split(' ')[1] === Buffer.from('ali:123456').toString('base64')) {
    res.statusCode = 200;
    message = 'OK';
  } else {
    res.statusCode = 401;
    message = 'unauthorization';
  }

  res.send({ message });
});

app.post('/auth/bearer', (req, res) => {
  let message;
  if (req.headers.authorization.split(' ')[1] === 'dbc67c0a-1562-4338-969b-7d312ba84115') {
    res.statusCode = 200;
    message = 'OK';
  } else {
    res.statusCode = 401;
    message = 'unauthorization';
  }

  res.send({ message });
});

app.put('/body', (req, res) => {
  // const msisdn = req.body;
  // if (misdn) {res.statusCode = 200;} else {res.statusCode = 400;};
  console.log(req.body);
  res.send({ message: 'response' });
});

const server = app.listen(app.get('port'), () => {
  console.log('Server running on port: ', app.get('port'));
});

// setTimeout(() => {
//   server.close();
// }, 10 * 1000);
