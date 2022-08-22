const { default: axios } = require('axios')

// constants
const GRANT_TYPE = 'client_credentials'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'
const TOKEN_METHOD_TYPE = 'POST'
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
 * @param tokenEndPoint Token end point is needed to get token
 * @param clientId Client id is needed to authenticate client
 * @param clientSecret Client secret is needed to authenticate client
 * @returns Will return whole token response. In response access_token needs to be extracted
 */
async function getClientToken({ ugTokenURL, clientId, clientSecret }) {
  if (isTokenExpired(token)) {
    const urlOptions = {
      method: TOKEN_METHOD_TYPE,
      url: ugTokenURL,
      headers: { 'content-type': CONTENT_TYPE },
      data: new URLSearchParams({
        grant_type: GRANT_TYPE,
        client_id: clientId,
        client_secret: clientSecret,
        scope: SCOPE,
      }),
    }
    const authenticationResponse = await axios.request(urlOptions)
    if (authenticationResponse) {
      const { data } = authenticationResponse
      const { access_token } = data
      token = access_token
    }
  }
  return token
}

module.exports = {
  getClientToken,
  isTokenExpired
}
