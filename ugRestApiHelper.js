
const axios = require('axios').default

const { getClientToken } = require('./tokenCall')
const { UGConnectionProperties } = require('./ugConnectionProperties')
const { Filter } = require('./ugFilter')

// connection object which contains ug rest api connection properties
let ugConnection = new UGConnectionProperties(null, null, null, null)
// fixed attribute values to be used in functions
const GROUP_ATTRIBUTE_NAME_FOR_FILTER_QUERY = 'name'
const GROUPS_DATA_SET_NAME = 'groups'
const USERS_DATA_SET_NAME = 'users'
// UG Methods
const METHOD_GET = 'GET'

/**
 * This will initialize connection propties that will be used through out the session
 */
const initConnectionProperties = ({ ugURL, clientId, clientSecret, ugTokenURL, subscriptionKey }) => {
    ugConnection = new UGConnectionProperties(ugURL, clientId, clientSecret, ugTokenURL, subscriptionKey)
}

/**
 * This will fetch groups based on the group name. If members needed along with groups then expand members needs to be true
 * @param {*} groupName Group name is required to fetch group or groups
 * @param {*} operatorToUseInFilter Operator needs to specify to filter groups data from UG
 * @param {*} expandMembers This flag will indicate whether members are needed along with groups
 * @returns Will return groups data based on the groupName, operator
 */
 async function getUGGroupsByGroupName(groupName, operatorToUseInFilter, expandMembers) {
    const access_token = await getClientToken(ugConnection)
    let expandMembersQueryInString = ''
    let filterQueryInString = new Filter(GROUP_ATTRIBUTE_NAME_FOR_FILTER_QUERY, operatorToUseInFilter, groupName).filterQueryInString
    if (expandMembers) {
        if(filterQueryInString !== '') {
            expandMembersQueryInString = '&$expand=members'
        } else {
            expandMembersQueryInString = '?$expand=members'
        }
    }
    const completeUGURLToFetchGroups = ugConnection.ugURL + '/' + GROUPS_DATA_SET_NAME + filterQueryInString + expandMembersQueryInString
    return await fetchData(access_token, completeUGURLToFetchGroups)
}

/**
 * This will fetch groups data based on the filter attribute passed
 * @param {*} groupFilterAttributeName Attribute name needs to be passed to add in filter
 * @param {*} operatorToUseInFilter Operator needs to specify to filter group or groups
 * @param {*} groupFilterAttributeValue This should be the data which needs to be filter out
 * @param {*} expandMembers This flag will indicate whether members are needed along with groups
 * @returns Will return groups data based on the filter properties
 */
async function getUGGroups(groupFilterAttributeName, operatorToUseInFilter, groupFilterAttributeValue, expandMembers) {
    const access_token = await getClientToken(ugConnection)
    let expandMembersQueryInString = ''
    const filterQueryInString = new Filter(groupFilterAttributeName, operatorToUseInFilter, groupFilterAttributeValue).filterQueryInString
    if (expandMembers) {
        if(filterQueryInString !== '') {
            expandMembersQueryInString = '&$expand=members'
        } else {
            expandMembersQueryInString = '?$expand=members'
        }
    }
    const completeUGURLToFetchGroups = ugConnection.ugURL + '/' + GROUPS_DATA_SET_NAME + filterQueryInString + expandMembersQueryInString
    return await fetchData(access_token, completeUGURLToFetchGroups)
}

/**
 * This will fetch users data based on the filter attribute passed
 * @param {*} userFilterAttributeName Attribute name needs to be passed to add in filter
 * @param {*} operatorToUseInFilter Operator needs to specify to filter user or users
 * @param {*} userFilterAttributeValue This should be the data which needs to be filter out
 * @returns Will return users data based on the filter properties
 */
async function getUGUsers(userFilterAttributeName, operatorToUseInFilter, userFilterAttributeValue) {
    const access_token = await getClientToken(ugConnection)
    const filterQueryInString = new Filter(userFilterAttributeName, operatorToUseInFilter, userFilterAttributeValue).filterQueryInString
    const completeUGURLToFetchUsers = ugConnection.ugURL + '/' + USERS_DATA_SET_NAME + filterQueryInString
    return await fetchData(access_token, completeUGURLToFetchUsers)
}

/**
 * This will fetch data from UG
 * @param ugToken Token is needed to fetch Data from UG Rest Api
 * @param ugURL UGURL is needed to fetch data
 * @returns Will return data from desired data set given in ugURL either 'users' or 'groups'
 */
async function fetchData(ugToken, ugURL) {
    const options = {
        method: METHOD_GET,
        url: ugURL,
        baseURL: ugURL,
        headers: {
            Authorization: `Bearer ${ugToken}`,
            'Ocp-Apim-Subscription-Key': ugConnection.subscriptionKey,
        },
    }
    const ugResponse = await axios.request(options)
    if (ugResponse) {
        const { data } = ugResponse
        return data
    } else {
        return []
    }
}

module.exports = {
    initConnectionProperties,
    getUGGroups,
    getUGUsers,
    getUGGroupsByGroupName
}
