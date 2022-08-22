# ug-rest-api-helper
Hold helper functions to retrive data from UG Rest Api

# Agenda UG Rest Api Helper
This project has the implementation of calling UG rest API. It will fetch users and groups data.

# Passing Connection Properties
UG rest Api requires authentication token to send back data. For that, need to pass few connection parameters first to make sure that there will be no un-authorized response issue during fetching time of UG data set.
In `ugRestApiHelper` , connection properties needs to be set using `initConnectionProperties` method and in that method following parameters need to pass.
1. `ugTokenURL` needs to pass to get access token
2. `clientId` needs to pass to get access token.
3. `clientSecret` needs to pass to get access token.
4. `ugURL` needs to pass. This will be used while fetching UG data.
5. `subscriptionKey` needs to pass. (Optional)

Note: Make sure `ugURL` is correct and authenicates the `subscriptionKey` that is passed.

If token is not expired then Api will use existing token to fetch the data otherwise it will generate a new token.

# Fetch UG Data
There are two data set supported so far.
1. Users
2. Groups

# Fetch UG Groups
For groups to fetch there are two methods added.

1. getUGGroups
 This method will receive `groupFilterAttributeName` which indicates property name like 'name', 'kthid' etc, `operatorToUseInFilter` like 'eq', 'contains', 'startswith' etc, `groupFilterAttributeValue` like 'sst' (this will be the filter value to filter out the data).

2. getUGGroupsByGroupName
 This method will bring groups along with members if needed. There is a flag `expandMembers`. If this set to true then it will fetch groups along with members. `groupName` needs to pass because filter will preapplied to 'name' only. `operatorToUseInFilter` also needed that how data should filter.

# Fetch UG Users
For user to fetch there is one method.
1. getUGUsers
This method will receive `userFilterAttributeName` which indicates property name like 'givenName', 'kthid' etc, `operatorToUseInFilter` like 'eq', 'contains', 'startswith' etc, `userFilterAttributeValue` like 'Joakim' (this will be the filter value to filter out the data)

# Opertors supported so far
There are few filter operators that are supported so far.
1. eq
2. startswith
3. contains
4. in

Use on of these operators to filter out data.

TODO: There are other operators as well that is supported by UG Rest Api. Those will be including in the future.

Check the link below to see what are the supported filter by UG.

https://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc453752358
