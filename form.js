const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('<form action="/submit" method="post"><label for="message">Mensaje:</label><input type="text" id="message" name="message"><br><label for="destination">Destinatario:</label><input type="text" id="destination" name="destination"><br><input type="submit" value="Enviar"></form>');
});

app.post('/submit', async (req, res) => {
  const message = req.body.message;
  const destination = req.body.destination;

  const url = 'http://192.168.22.150/cgi/WebCGI?1500101=account=apiuser&password=apipass&port=1&destination=' + destination + '&content=' + encodeURIComponent(message);

  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    console.error('Error al enviar la solicitud a la API:', error);
    res.status(500).send('Error al enviar la solicitud a la API');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});