const express = require('express');
const app = express();
const port = 3001;

const requetes = require('./requetes')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/api/commune/', (req, res) => {
    // console.log('req:', req);
    const codinsee = req.query.codinsee;
    requetes.getCommuneByCodinsee(codinsee)
    .then(response => {
      res.status(200).send(response);
      console.log(response)
    })
    .catch(error => {
      res.status(500).send(error);
      console.log(error)
    })
  })

  app.get('/api/geocode/', (req, res) => {
    // console.log('req:', req)
    const lon = req.query.lon;
    const lat = req.query.lat;
    requetes.getCommuneByCoord(lon, lat)
    .then(response => {
      res.status(200).send(response);
      // console.log(response)
    })
    .catch(error => {
      res.status(500).send(error);
      console.log(error)
    })
  })

  app.get('/api/closest/', (req, res) => {
    // console.log('req:', req)
    const lon = req.query.lon;
    const lat = req.query.lat;
    requetes.getCloseTransaction(lon, lat)
    .then(response => {
      res.status(200).send(response);
      //console.log(response)
    })
    .catch(error => {
      res.status(500).send(error);
      console.log(error)
    })
  })

  app.get('/api/histodvf/', (req, res) => {
    // console.log('req:', req);
    const codinsee = req.query.codinsee;
    requetes.getPrixByCodinsee(codinsee)
    .then(response => {
      res.status(200).send(response);
      console.log(response)
    })
    .catch(error => {
      res.status(500).send(error);
      console.log(error)
    })
  })

  app.get('/api/meteo/', (req, res) => {
    // console.log('req:', req)
    const lon = req.query.lon;
    const lat = req.query.lat;
    requetes.getMeteoByCoord(lon, lat)
    .then(response => {
      res.status(200).send(response);
      // console.log(response)
    })
    .catch(error => {
      res.status(500).send(error);
      console.log(error)
    })
  })

  app.get('/api/securite/', (req, res) => {
    const codinsee = req.query.codinsee;
    requetes.getSecuriteByCodinsee(codinsee)
    .then(response => {
      res.status(200).send(response);
      console.log(response)
    })
    .catch(error => {
      res.status(500).send(error);
      console.log(error)
    })
  })

  app.get('/api/wiki/', (req, res) => {
    const codinsee = req.query.codinsee;
    requetes.getWikiByCodinsee(codinsee)
    .then(response => {
      res.status(200).send(response);
      console.log(response)
    })
    .catch(error => {
      res.status(500).send(error);
      console.log(error)
    })
  })

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})