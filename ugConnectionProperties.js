class UGConnectionProperties {
    constructor(ugURL, clientId, clientSecret, authorityURL, subscriptionKey) {
        this.ugURL = ugURL
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.authorityURL = authorityURL
        this.subscriptionKey = subscriptionKey
        this.scope = scope
    }
}

module.exports = {
    UGConnectionProperties
}