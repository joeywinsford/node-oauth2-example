const sqlite = require('sqlite3').verbose()
const path = require('path')

const db = new sqlite.Database(path.join(__dirname, '../sqlite/auth.db'))

const getAccessToken = async (bearerToken) => {
    return new Promise((resolve, reject) => {

        db.get('SELECT access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id, scope FROM oauth_tokens WHERE access_token = $accessToken', {
            accessToken: bearerToken
        }, (err, row) => {
            if (err)
                return reject(err)
            
            resolve({
                accessToken: row.access_token,
                client: { id: row.client_id },
                accessTokenExpiresAt: new Date(row.access_token_expires_on),
                user: { id: row.user_id },
                scope: row.scope
            })
        })
    })
}

const getClient = async (clientId, clientSecret) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT client_id, client_secret, redirect_uri FROM oauth_clients WHERE client_id = $clientId AND client_secret = $clientSecret', {
            $clientId: clientId,
            $clientSecret: clientSecret
        }, (err, row) => {
            if (err)
                return reject(err)
            
            resolve({
                clientId: row.client_id,
                clientSecret: row.client_secret,
                grants: ['password']
            })
        })
    })
}

const getUser = async (username, password) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT id FROM users WHERE username = $username AND password = $password', {
            $username: username,
            $password: password
        }, (err, row) => {
            if (err)
                return reject(err)
            
            resolve(row)
        })
    })
}

const saveToken = async ({ accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt, scope }, client, user) => {
    console.log('SAVING TOKEN', { client, user })
    return new Promise((resolve, reject) => {
        db.get(`INSERT INTO oauth_tokens(access_token, access_token_expires_on, client_id, refresh_token, refresh_token_expires_on, user_id, scope) 
        VALUES ($accessToken, $accessTokenExpiresAt, $clientId, $refreshToken, $refreshTokenExpiresAt, $userId, $scope)`, {
            $accessToken: accessToken,
            $accessTokenExpiresAt: accessTokenExpiresAt,
            $clientId: client.clientId,
            $refreshToken: refreshToken,
            $refreshTokenExpiresAt: refreshTokenExpiresAt,
            $userId: user.id,
            $scope: scope
        }, (err, row) => {
            if (err)
                return reject(err)
            
            resolve({
                accessToken: row.access_token,
                accessTokenExpiresAt: new Date(row.access_token_expires_on),
                refreshToken: row.refresh_token,
                refreshTokenExpiresAt: row.refresh_token_expires_on,
                scope: row.scope,
                client: { id: client.id },
                user: { id: user.id }
            })
        })
    })
}

module.exports = {
    getAccessToken,
    getClient,
    getUser,
    saveToken
}