import { elasticAggregations, filterMap } from '../utils/searchUtils'

class ElaticQuery {
    from: number;
    size: number;
    query: any;
    aggs: any;

    constructor(from: number = 0, size: number = 10) {
        this.from = from
        this.size = size
        this.query = {
            bool: {
                must: [],
                filter: []
            }
        }
        this.aggs = {}
    }

    addMultiMatch(queryTerm: string): any {
        this.query.bool.must.push({
            multi_match: { 
                query: queryTerm,
                fields: ['title_txt_df', 'description_txt_df', 'country_txt_df', "id_txt"]
            }
        })
        return this
    }

    addTermFilters(invertedIndex: string, value: string[]): any {
        const termFilter = value.length > 1 
            ? { terms: { [invertedIndex]: value } }
            : { term: { [invertedIndex]: value[0] } }
        this.query.bool.filter.push(termFilter)
        return this
    }

    aggregations(aggregations: any = elasticAggregations): any {
        this.aggs = aggregations
        return this
    }

    getQuery(request: any) {
        if (request.aggregations === 'true') {
            this.aggregations()
        }
        if (request.query) {
            this.addMultiMatch(request.query)
        }
        Object.keys(request).forEach(item => {
            const invertedIndex = filterMap.get(item)
            if (filterMap.has(item) && !!invertedIndex) {
                this.addTermFilters(invertedIndex, [request[item]])
            }
        })
        return this
    }
}

export default ElaticQuery