const { ConfidentialClientApplication } = require('@azure/msal-node')

// constants
const SCOPE = 'openid'

// token attribute to store to avoid recalling authentication call if it's not expired
let token = null

/**
 * This will decode given token and check if expiry time is greater than current time. If it is then the given token is not expired.
 * @param {*} token Token to verify if expired or not
 * @returns Will return boolean. True is for expired and False is for not expired
 */
 const isTokenExpired = (token) => {
  let tokenExpired = true
  if (token) {
    const tokenPayload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    const expiryTime = tokenPayload.exp
    if (Date.now() < expiryTime * 1000) {
      tokenExpired = false
    }
  }
  return tokenExpired
}

/**
 * This will get new access token if token is not expired
 * @param authorityURL Token Authority url is needed
 * @param clientId Client id is needed to authenticate client
 * @param clientSecret Client secret is needed to authenticate client
 * @returns Will return whole token response. In response access_token needs to be extracted
 */
async function getClientToken({ authorityURL, clientId, clientSecret }) {
  if (isTokenExpired(token)) {
    const cca = new ConfidentialClientApplication({
      auth: {
        authority: authorityURL,
        knownAuthorities: [authorityURL],
        clientId: clientId,
        clientSecret: clientSecret,
      },
    })
    const authenticationParameters = { scopes: [SCOPE] }
    const authenticationResponse = await cca.acquireTokenByClientCredential(authenticationParameters)
    if (authenticationResponse) {
      const { accessToken } = authenticationResponse
      token = accessToken
    }
  }
  return token
}

module.exports = {
  getClientToken,
  isTokenExpired
}
