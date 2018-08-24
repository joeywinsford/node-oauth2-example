const sqlite = require('sqlite3').verbose()
const path = require('path')

const dbPath = path.join('sqlite', 'auth.db')
console.log('Creating new db at', dbPath)

const db = new sqlite.Database(dbPath)

db.run(`CREATE TABLE oauth_tokens (
    id uuid PRIMARY KEY,
    access_token text NOT NULL,
    access_token_expires_on text NOT NULL,
    client_id text NOT NULL,
    refresh_token text NOT NULL,
    refresh_token_expires_on text NOT NULL,
    user_id uuid NOT NULL,
    scope text NOT NULL
);`)

db.run(`CREATE TABLE oauth_clients (
    client_id text NOT NULL,
    client_secret text NOT NULL,
    redirect_uri text NOT NULL,
    PRIMARY KEY(client_id, client_secret)
);`)

db.run(`CREATE TABLE users (
    id uuid PRIMARY KEY NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);`)

db.close()

