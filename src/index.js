const express = require('express')

const app = express()
const PORT_NUMBER = 8091

app.use(express.json())

app.get('/', (_, res) => res.status(200).send(new Date().toUTCString()))

app.post('/', (req, res) => res.status(200).send({ echo: req.body }))

app.listen(PORT_NUMBER, () => console.log(`node-authentication example listening on port ${PORT_NUMBER}`))