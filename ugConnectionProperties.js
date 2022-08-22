class UGConnectionProperties {
    constructor(ugURL, clientId, clientSecret, ugTokenURL, subscriptionKey) {
        this.ugURL = ugURL
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.ugTokenURL = ugTokenURL
        this.subscriptionKey = subscriptionKey
    }
}

module.exports = {
    UGConnectionProperties
}