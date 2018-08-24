const createExpressApp = require('express')

const app = createExpressApp()
const PORT_NUMBER = 8091

app.get('/', (_, res) => res.status(200).send(new Date().toUTCString()))

app.listen(PORT_NUMBER, () => console.log(`node-authentication example listening on port ${PORT_NUMBER}`))