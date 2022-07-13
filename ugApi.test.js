const axios = require('axios')
const { fetchDataByType } = require('./ugApi')

jest.mock('axios')


describe('Perform ug Redis call to get data', () => {
    test('check users data without any filters', async () => {
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
            dataSet: '/users',
        })
        expect(axios.get).pass('Users fetch call succeed')
    })

    test('check users data with filter query', async () => {
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
            dataSet: '/users',
            filterQuery: `?$filter=contains(givenName, 'Joakim')`
        })
        expect(axios.get).pass('Users fetch call succeed')
    })

    test('check users data with filter attributes', async () => {
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
            dataSet: '/users',
            filterAttributeName: 'givenName',
            filterData: 'Joakim',
            filterType: 'contains',
        })
        expect(axios.get).pass('Users fetch call succeed')
    })
    test('check users data with filter attributes and with filter type equals', async () => {
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
            dataSet: '/users',
            filterAttributeName: 'givenName',
            filterData: 'Joakim',
            filterType: 'eq',
        })
        expect(axios.get).pass('Users fetch call succeed')
    })
    test('check users data with filter attributes filter type In', async () => {
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
            dataSet: '/users',
            filterAttributeName: 'memberOf',
            filterData: ['u2m94e93', 'u2m94e94', 'u2m94e95'],
            filterType: 'in',
        })
        expect(axios.get).pass('Users fetch call succeed')
    })
    test('check groups data without any filters', async () => {
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
            dataSet: '/groups',
        })
        expect(axios.get).pass('Groups fetch call succeed')
    })
    test('check groups data with filter query', async () => {
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
            dataSet: '/groups',
            filterQuery: `?$filter=startswith(name,'edu.courses.SF.SF1624.examiner')`
        })
        expect(axios.get).pass('Groups fetch call succeed')
    })

    test('check groups data with filter attributes', async () => {
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
            dataSet: '/groups',
            filterAttributeName: 'name',
            filterData: 'edu.courses.SF.SF1624.examiner',
            filterType: 'startsWith',
        })
        expect(axios.get).pass('Groups fetch call succeed')
    })
})
