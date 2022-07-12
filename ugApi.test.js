const axios = require('axios')
const { fetchDataByType } = require('./ugApi')

jest.mock('axios')


describe('Perform ug Redis call to get data', () => {
    test('check users data', async () => {
        axios.get.mockResolvedValueOnce({ data: [] })
        await fetchDataByType({
            tokenFetchOptions: {
                tokenEndPoint: '',
                clientKey: '',
                clientSecret: '',
                scope: '',
            },
            ugURL: '',
            subscriptionKey: '',
            fetchUsers: true,
            filterAttributeName: '',
            filterData: '',
            filterQuery: null,
            filterType: 'users'
        })
        expect(axios.get).pass('Users fetch call succeed')
    })
    test('check groups data', async () => {
        axios.get.mockResolvedValueOnce({ data: [] })
        await fetchDataByType({
            tokenFetchOptions: {
                tokenEndPoint: '',
                clientKey: '',
                clientSecret: '',
                scope: '',
            },
            ugURL: '',
            subscriptionKey: '',
            fetchUsers: true,
            filterAttributeName: '',
            filterData: '',
            filterQuery: null,
            filterType: 'groups'
        })
        expect(axios.get).pass('Groups fetch call succeed')
    })
})
