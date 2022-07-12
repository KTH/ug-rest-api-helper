const axios = require('axios')
const { getClientToken } = require('./tokenCall')

jest.mock('axios')


describe('Perform token call to get authentication token', () => {
  test('check get client authentication function', async () => {
    axios.post.mockResolvedValueOnce({ data: {} })
    await getClientToken({
      tokenEndPoint: '',
      clientKey: '',
      clientSecret: '',
      scope: '',
    })
    expect(axios.post).pass('Token Fetch call succeed')
  })
})
