// filter types
const CONTAINS = 'contains'
const STARTS_WITH = 'startswith'
const EQUALS = 'eq'
const IN = 'in'

/**
 * Filter properties to build filter query for UG
 */
class Filter {
    constructor(filterAttributeName, operator, value) {
        this.filterAttributeName = filterAttributeName
        this.operator = operator
        this.value = value
    }

    /**
     * This will generate filter query in string based on the filter attribute name, operator and value
     * @returns Will return filter query in string
     */
    get filterQueryInString() {
        let filterQueryString = '?$filter='
        if (this.operator) {
            switch (this.operator) {
                case CONTAINS:
                case STARTS_WITH:
                    filterQueryString += `${this.operator}(${this.filterAttributeName},'${this.value}')`
                    break
                case EQUALS:
                    filterQueryString += `${this.filterAttributeName} ${this.operator} '${this.value}'`
                    break
                case IN:
                    let filterDataInString = ''
                    if (Array.isArray(this.value)) {
                        this.filterData.forEach(data => {
                            filterDataInString += `'${data}',`
                        })
                        filterDataInString = filterDataInString.substring(0, filterDataInString.length - 1)
                    } else {
                        filterDataInString += `'${this.value}'`
                    }
                    filterQueryString += `${this.filterAttributeName} ${this.operator} (${filterDataInString})`
                    break
                default:
                    filterQueryString = ''
                    break
            }
        } else {
            filterQueryString = ''
        }
        return filterQueryString
    }
}

module.exports = {
    Filter
}