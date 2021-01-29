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

export const filterMap = new Map([
  ['store', 'store_kw_df'],
  ['type', 'type_kw_df']
])