const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('GET / This is the root URL');
});

app.get('*', (req, res) => {
  throw new Error(`Sorry, the request doesn't match`)
})

app.use((err, req, res, next) => {
  err.status = 404;
  next(err)
})

app.use((err, req, res, next) => {
  console.log(err.message)
  res.status(err.status || 500)
  res.json({ 'message': err.message, "statusCode": err.status })
})

const port = 5000;
app.listen(port, () => console.log('Server is listening on port', port));