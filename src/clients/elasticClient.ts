import 'dotenv/config'
import { ApiResponse, Client } from '@elastic/elasticsearch'

const defaultClient = new Client({
    node: process.env.ELASTIC_URL,
    auth: {
      username: process.env.ELASTIC_ACCESS_KEY || '',
      password: process.env.ELASTIC_ACCESS_SECRET || ''
    }
})

class ElasticClient {
    indexName: string
    client: Client

    constructor(indexName: string = 'products-final', client: Client = defaultClient) {
        this.indexName = indexName
        this.client = client
    }

    async executeSearch(searchBody: any): Promise<ApiResponse<Record<string, any>, unknown>> {
        return this.client.search({
            index: this.indexName,
            from: 0,
            size: 10,
            body: searchBody
        }, {
            ignore: [404],
            maxRetries: 3
        })
    }
}

export default ElasticClient