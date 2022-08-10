const { default: axios } = require('axios')

// constants
const GRANT_TYPE = 'client_credential'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'
const TOKEN_METHOD_TYPE = 'POST'

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
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    const tokenPayload = JSON.parse(jsonPayload)
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
 * @param clientKey Client id is needed to authenticate client
 * @param clientSecret Client secret is needed to authenticate client
 * @param scope scope is optional
 * @returns Will return whole token response. In response access_token needs to be extracted
 */
async function getClientToken({ tokenEndPoint, clientKey, clientSecret, scope }) {
  if (isTokenExpired(token)) {
    const urlOptions = {
      method: TOKEN_METHOD_TYPE,
      url: tokenEndPoint,
      headers: { 'content-type': CONTENT_TYPE },
      data: new URLSearchParams({
        grant_type: GRANT_TYPE,
        client_id: clientKey,
        client_secret: clientSecret,
        scope: scope,
      }),
    }
    const authenticationResponse = await axios.request(urlOptions)
    if (authenticationResponse) {
      const { access_token } = authenticationResponse
      token = access_token
    }
  }
  return token
}

module.exports = {
  getClientToken,
  isTokenExpired
}
