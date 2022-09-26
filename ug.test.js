const { Filter } = require('./ugFilter')


describe('Test ug filter queries', () => {
    test('check without any filters', () => {
        const filterQuery = new Filter(null, null, null).filterQueryInString
        expect(filterQuery).toStrictEqual('')
    })

    test('check with filter eq', async () => {
        const filterQuery = new Filter('username', 'eq', 'sst').filterQueryInString
        expect(filterQuery).toStrictEqual(`?$filter=username eq 'sst'`)
    })

    test('check with filter contains', async () => {
        const filterQuery = new Filter('givenName', 'contains', 'Joakim').filterQueryInString
        expect(filterQuery).toStrictEqual(`?$filter=contains(givenName,'Joakim')`)
    })
    test('check with filter type In', async () => {
        const filterQuery = new Filter('memberOf', 'in', ['u2m94e93', 'u2m94e94', 'u2m94e95']).filterQueryInString
        expect(filterQuery).toStrictEqual(`?$filter=memberOf in ('u2m94e93','u2m94e94','u2m94e95')`)
    })
})
