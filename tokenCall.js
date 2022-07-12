/* eslint-disable func-names */
const { default: axios } = require('axios')

const GRANT_TYPE = 'client_credential'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'
const TOKEN_METHOD_TYPE = 'POST'

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
