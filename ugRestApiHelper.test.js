const axios = require('axios')
const { getUGGroups, getUGUsers, getUGGroupsByGroupName, initConnectionProperties } = require('./ugRestApiHelper')

jest.mock('axios')


describe('Perform ug Redis call to get data', () => {
    initConnectionProperties({ ugURL: 'http://localhost:3000', clientId: 'test', clientSecret: 'test', ugTokenURL: 'http://localhost:3000', subscriptionKey: 'test' })
    test('check users data without any filters', async () => {
        axios.get.mockResolvedValueOnce({ data: [] })
        await getUGUsers(null, null, null)
        expect(axios.get).pass('Users fetch call succeed')
    })

    test('check users data with filter eq', async () => {
        axios.get.mockResolvedValueOnce({ data: [] })
        await getUGUsers('username', 'eq', 'sst')
        expect(axios.get).pass('Users fetch call succeed')
    })

    test('check users data with filter contains', async () => {
        axios.get.mockResolvedValueOnce({ data: [] })
        await getUGUsers('givenName', 'Joakim', 'contains')
        expect(axios.get).pass('Users fetch call succeed')
    })
    test('check users data with filter type In', async () => {
        axios.get.mockResolvedValueOnce({ data: [] })
        await getUGUsers('memberOf', ['u2m94e93', 'u2m94e94', 'u2m94e95'], 'in')
        expect(axios.get).pass('Users fetch call succeed')
    })
    test('check groups data without any filters', async () => {
        axios.get.mockResolvedValueOnce({ data: [] })
        await getUGGroups(null, null, null)
        expect(axios.get).pass('Groups fetch call succeed')
    })
    test('check groups data with filter operator eq', async () => {
        axios.get.mockResolvedValueOnce({ data: [] })
        await getUGGroups('name', 'eq', 'edu.courses.SF.SF1624.examiner')
        expect(axios.get).pass('Groups fetch call succeed')
    })

    test('check groups data with filter attribute startsWith', async () => {
        axios.get.mockResolvedValueOnce({ data: [] })
        await getUGGroups('name', 'edu.courses.SF.SF1624.examiner', 'startswith')
        expect(axios.get).pass('Groups fetch call succeed')
    })

    test('check groups data with filter attribute startsWith and expand members', async () => {
        axios.get.mockResolvedValueOnce({ data: [] })
        await getUGGroupsByGroupName('edu.courses.SF.SF1624.examiner', 'startswith', true)
        expect(axios.get).pass('Groups fetch call succeed')
    })
})
