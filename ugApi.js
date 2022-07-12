
const axios = require('axios').default

const { getClientToken } = require('./tokenCall')

const USERS_END_POINT = '/users'
const GROUPS_END_POINT = '/groups'
// filter types
const METHOD_GET = 'GET'
const CONTAINS = 'contains'
const STARTS_WITH = 'startsWith'
const EQUALS = 'eq'
const MEMBER_OF = 'memberOf'
const IN = 'in'

function _getFilterString(filterType, filterAttributeName, filterData) {
    let filterQueryString = '?$filter='
    switch (filterType) {
        case CONTAINS:
            filterQueryString += `${CONTAINS}(${filterAttributeName},'${filterData}'`
            break
        case STARTS_WITH:
            filterQueryString += `${STARTS_WITH}(${filterAttributeName},'${filterData}'`
            break
        case EQUALS:
            filterQueryString += `${filterAttributeName} ${EQUALS} '${filterData}'`
            break
        case MEMBER_OF:
        case IN:
            let filterDataInString = ''
            if (Array.isArray(filterData)) {
                filterData.forEach(data => {
                    filterDataInString += `'${data}',`
                })
                filterDataInString = filterDataInString.substring(0, filterDataInString.length - 1)
            } else {
                filterDataInString += `'${filterData}'`
            }
            filterQueryString += `${MEMBER_OF} ${IN} (${filterDataInString})`
            break
        default:
            filterQueryString = ''
            break
    }
    return filterQueryString
}


/**
 * This will fetch data from UG
 * @param fetchUsers If this flag is true then this function will fetch users data otherwise groups data
 * @param token If token is passed then this will not generate new token. It will use this token to fetch data
 * @param tokenFetchOptions For generation of new token. Token options are needed
 * @param ugURL This url is needed to fetch data from UG
 * @param subscriptionKey This key is needed for the authentication to azure portal
 * @param filterAttributeName Attribute name that will apply on filter query attribute
 * @param filterData Attribute data that will apply on filter query
 * @param filterQuery Whole filter query can also be applied if filter attribute name, data and type is not defined
 * @returns Will return data from desired data set either 'users' or 'groups'
 */
async function _filterDataByType({ fetchUsers, token, tokenFetchOptions, ugURL, subscriptionKey, filterAttributeName, filterType, filterData, filterQuery }) {
    if (!token ) {
        const tokenResponse = await getClientToken(tokenFetchOptions)
        if(tokenResponse) {
            token = access_token
        }
    }
    let filterQueryInString = ''
    // prepare filters
    if (filterAttributeName && filterData && filterType) {
        filterQueryInString = _getFilterString(filterType, filterAttributeName, filterData)
    } else if (filterQuery) {
        filterQueryInString = filterQuery
    }
    const options = {
        method: METHOD_GET,
        url: ugURL + fetchUsers ? USERS_END_POINT + filterQueryInString : GROUPS_END_POINT + filterQueryInString,
        headers: {
            Authorization: `Bearer ${token}`,
            'Ocp-Apim-Subscription-Key': subscriptionKey,
        },
    }
    const ugResponse = await axios.request(options)
    if(ugResponse) {
        const { data } = ugResponse
        return data
    } else {
        return []
    }
}

module.exports = {
    fetchDataByType: _filterDataByType
}
