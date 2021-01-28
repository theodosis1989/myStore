import { elasticAggregations } from '../utils/searchUtils'

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
                must: []
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
        console.log(JSON.stringify(this))
        return this
    }

    aggregations(aggregations: any = elasticAggregations): any {
        this.aggs = aggregations
        return this
    }
}

export default ElaticQuery