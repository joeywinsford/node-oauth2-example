const express = require('express')
const morgan = require('morgan')
const OAuthServer = require('express-oauth-server')

const model = require('./oauthModel')

const app = express()
const PORT_NUMBER = 8091

app.oauth = new OAuthServer({
    model,
    grants: ['password'],
    debug: true
})

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(PORT_NUMBER, () => console.log(`node-authentication example listening on port ${PORT_NUMBER}`))

app.post('/oauth/token', app.oauth.token())

app.get('/', (_, res) => res.status(200).send(new Date().toUTCString()))

app.post('/', app.oauth.authenticate(), (req, res) => res.status(200).send({ echo: req.body }))