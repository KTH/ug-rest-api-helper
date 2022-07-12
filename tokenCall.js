const { default: axios } = require('axios')

// constants
const GRANT_TYPE = 'client_credential'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'
const TOKEN_METHOD_TYPE = 'POST'

/**
 * This will get new access token
 * @param tokenEndPoint Token end point is needed to get token
 * @param clientKey Client id is needed to authenticate client
 * @param clientSecret Client secret is needed to authenticate client
 * @param scope scope is optional
 * @returns Will return whole token response. In response access_token needs to be extracted
 */
async function _getClientToken({ tokenEndPoint, clientKey, clientSecret, scope }) {
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
  return await axios.request(urlOptions)
}

module.exports = {
  getClientToken: _getClientToken,
}
