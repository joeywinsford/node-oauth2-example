const sqlite = require('sqlite3').verbose()
const path = require('path')

const dbPath = path.join('sqlite', 'auth.db')
console.log('Populating db at', dbPath)

const db = new sqlite.Database(dbPath)

db.serialize(() => {
    db.run(`DELETE FROM oauth_clients`)
    db.run(`INSERT INTO oauth_clients (client_id, client_secret, redirect_uri)
VALUES ($clientId, $clientSecret, 'not sure')`, {
            $clientId: 'test_client',
            $clientSecret: 'qGc4YE+IiE6KHi0XBXFNFw=='
        })

    db.run(`DELETE FROM users`)
    db.run(`INSERT INTO users (id, username, password)
    VALUES (1, $username, $password)`, {
            $username: 'joe',
            $password: 'password1'
        })
})

db.close()

