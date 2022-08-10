
const axios = require('axios').default

const { getClientToken } = require('./tokenCall')

// filter types
const METHOD_GET = 'GET'
const CONTAINS = 'contains'
const STARTS_WITH = 'startsWith'
const EQUALS = 'eq'
const IN = 'in'

/**
 * This will generate filter query in string based on the parameters passed
 * @param {*} filterType Filter type is needed like 'contains', 'startsWith' etc.
 * @param {*} filterAttributeName Attribute name is need using which the filteraion perform
 * @param {*} filterData Data is needed to apply filter on given attribute name
 * @returns Will return filter query in string
 */
function _getFilterString(filterType, filterAttributeName, filterData) {
    let filterQueryString = '?$filter='
    switch (filterType) {
        case CONTAINS:
            filterQueryString += `${CONTAINS}(${filterAttributeName},'${filterData}')`
            break
        case STARTS_WITH:
            filterQueryString += `${STARTS_WITH}(${filterAttributeName},'${filterData}')`
            break
        case EQUALS:
            filterQueryString += `${filterAttributeName} ${EQUALS} '${filterData}'`
            break
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
            filterQueryString += `${filterAttributeName} ${IN} (${filterDataInString})`
            break
        default:
            filterQueryString = ''
            break
    }
    return filterQueryString
}


/**
 * This will fetch data from UG
 * @param dataSet Name of the data set whether it is '/users' or '/groups'
 * @param token If token is passed then this will not generate new token. It will use this token to fetch data
 * @param tokenFetchOptions For generation of new token. Token options are needed
 * @param ugURL This url is needed to fetch data from UG
 * @param subscriptionKey This key is needed for the authentication to azure portal
 * @param filterAttributeName Attribute name that will apply on filter query attribute
 * @param filterType Filter should contain filter condition keyword like 'contains', 'startsWith' etc.
 * @param filterData Attribute data that will apply on filter query
 * @param filterQuery Whole filter query can also be applied if filter attribute name, data and type is not defined
 * @returns Will return data from desired data set either 'users' or 'groups'
 */
async function _filterDataByDataSet({ dataSet, token, tokenFetchOptions, ugURL, subscriptionKey, filterAttributeName, filterType, filterData, filterQuery }) {
    if (!token ) {
        const access_token = await getClientToken(tokenFetchOptions)
        if(access_token) {
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
    const url = ugURL + dataSet + filterQueryInString
    const options = {
        method: METHOD_GET,
        url,
        baseURL: ugURL,
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
    fetchDataByDataSet: _filterDataByDataSet
}
