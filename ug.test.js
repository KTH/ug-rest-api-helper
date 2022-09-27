const { Filter } = require('./ugFilter')
const { faker } = require('@faker-js/faker')

describe('Test ug filter queries', () => {
    test('check without any filters', () => {
        const filterQuery = new Filter(null, null, null).filterQueryInString
        expect(filterQuery).toStrictEqual('')
    })

    test('check with filter eq', async () => {
        const username = faker.internet.userName()
        const filterQuery = new Filter('username', 'eq', username).filterQueryInString
        expect(filterQuery).toStrictEqual(`?$filter=username eq '${username}'`)
    })

    test('check with filter contains', async () => {
        const givenName = faker.name.firstName()
        const filterQuery = new Filter('givenName', 'contains', givenName).filterQueryInString
        expect(filterQuery).toStrictEqual(`?$filter=contains(givenName,'${givenName}')`)
    })
    test('check with filter type In', async () => {
        const ids = [faker.datatype.uuid(), faker.datatype.uuid(), faker.datatype.uuid()]
        const filterQuery = new Filter('memberOf', 'in', ids).filterQueryInString
        expect(filterQuery).toStrictEqual(`?$filter=memberOf in ('${ids[0]}','${ids[1]}','${ids[2]}')`)
    })
})
