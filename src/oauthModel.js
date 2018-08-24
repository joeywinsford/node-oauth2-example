const getAccessToken = async (bearerToken) => {
    console.log('getAccessToken', { bearerToken })
    return {
        accessToken: bearerToken,
        client: { id: 'auth-example-id' },
        user: { id: 'getAccessToken user' },
        accessTokenExpiresAt: new Date(2020, 12, 31)
    }
}

const getClient = async (clientId, clientSecret) => {
    console.log('getClient', { clientId, clientSecret })
    return {
        clientId,
        clientSecret,
        grants: ['password'],
        redirectUris: null
    }
}

const getUser = async (username, password) => {
    console.log('getUser', { username, password })
    return {
        username,
        name: 'Lebron James'
    }
}

const saveToken = async ({ accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt, scope }, client, user) => {
    console.log('saveToken', { accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt, scope, client, user })
    return {
        accessToken,
        accessTokenExpiresAt: new Date(accessTokenExpiresAt),
        refreshToken,
        refreshTokenExpiresAt,
        scope,
        client: { id: client.id },
        user: { id: user.id }
    }
}

module.exports = {
    getAccessToken,
    getClient,
    getUser,
    saveToken
}