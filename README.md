# ug-rest-api
Hold services to retrive data from UG Rest Api

# Agenda UG Rest Api
This project has the implementation of call UG rest API. It will fetch users and groups data.

# Fetch UG Data
UG rest API requires authentication token to send back data. If token is passed then new token will not get generated. Then need to pass data set name either `/users` or `/groups` along with the `ugURL` and `subscriptionKey`.

Note: Make sure `ugURL` is correct and authenicates the `subscriptionKey` that is passed.

If token is not passed then new token will get generated. For that need to send `tokenEndPoint`, `clientKey`, `clientSecret`, `scope`. If token is not expired then Api will use existing token to fetch the data otherwise it will generate a new token.

# Filter data query parameter
UG Rest API supports filtering of data based on the filters based in the headers
For filtering the data, there are two ways introduced in this project
1. Whole `filterQuery` can be passed like `?$filter=startswith(username, 'sst')`.
2. Need to pass `filterAttributeName`, `filterData`, `filterType`.

# FilterAttributeName
Filter Attribute name should be like this `username` or `givenName` based on the data set for the query.

# FilterData
Along with the filter attribute name data needs to be send like `'sst'`. In case of array data can be passed like this `['sst', 'test']`.

# FilterType
Along with the `filterAttributeName` and `filterData`,  `filterType` needs to be passed as well like `contains` or `startsWith`

Check the link below to see what are the supported filter by UG.

https://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752358
