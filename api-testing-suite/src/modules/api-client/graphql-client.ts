import { GraphQLClient, RequestDocument, Variables } from 'graphql-request';
import { ApiResponse, AuthConfig } from '../../types';
import { logger } from '../../core/logger/logger';

export class GraphqlClient {
  private client: GraphQLClient;
  private baseUrl: string;

  constructor(baseUrl: string, defaultHeaders?: Record<string, string>, auth?: AuthConfig) {
    this.baseUrl = baseUrl;
    
    const headers = { ...defaultHeaders };
    
    if (auth) {
      switch (auth.type) {
        case 'bearer':
          if (auth.token) {
            headers['Authorization'] = `Bearer ${auth.token}`;
          }
          break;
        case 'api-key':
          if (auth.apiKey && auth.apiKeyHeader) {
            headers[auth.apiKeyHeader] = auth.apiKey;
          }
          break;
      }
    }

    this.client = new GraphQLClient(baseUrl, {
      headers,
    });
  }

  async query<T = any>(
    query: RequestDocument,
    variables?: Variables
  ): Promise<ApiResponse> {
    const startTime = Date.now();

    try {
      logger.debug(`[GraphQL] Executing query`);
      
      const data = await this.client.request<T>(query, variables);
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      return {
        status: 200,
        statusText: 'OK',
        headers: { 'content-type': 'application/json' },
        data,
        responseTime,
        size: JSON.stringify(data).length,
      };
    } catch (error: any) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      logger.error('[GraphQL] Query error:', error);

      return {
        status: error.response?.status || 500,
        statusText: error.response?.statusText || 'Internal Server Error',
        headers: error.response?.headers || {},
        data: error.response?.errors || { error: error.message },
        responseTime,
        size: JSON.stringify(error.response?.errors || {}).length,
      };
    }
  }

  async mutation<T = any>(
    mutation: RequestDocument,
    variables?: Variables
  ): Promise<ApiResponse> {
    const startTime = Date.now();

    try {
      logger.debug(`[GraphQL] Executing mutation`);
      
      const data = await this.client.request<T>(mutation, variables);
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      return {
        status: 200,
        statusText: 'OK',
        headers: { 'content-type': 'application/json' },
        data,
        responseTime,
        size: JSON.stringify(data).length,
      };
    } catch (error: any) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      logger.error('[GraphQL] Mutation error:', error);

      return {
        status: error.response?.status || 500,
        statusText: error.response?.statusText || 'Internal Server Error',
        headers: error.response?.headers || {},
        data: error.response?.errors || { error: error.message },
        responseTime,
        size: JSON.stringify(error.response?.errors || {}).length,
      };
    }
  }

  setHeader(key: string, value: string): void {
    this.client.setHeader(key, value);
  }

  setHeaders(headers: Record<string, string>): void {
    this.client.setHeaders(headers);
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
