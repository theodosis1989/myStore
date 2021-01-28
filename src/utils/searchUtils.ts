export const elasticAggregations = {
    type: {
        terms: {
            field: 'type'
        }
    },
    store: {
        terms: {
            field: 'store'
        }
    }
}