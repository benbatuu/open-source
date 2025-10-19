import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiRequest, ApiResponse, AuthConfig } from '../../types';
import { logger } from '../../core/logger/logger';

export class HttpClient {
  private client: AxiosInstance;
  private baseUrl: string;

  constructor(baseUrl: string, defaultHeaders?: Record<string, string>, auth?: AuthConfig) {
    this.baseUrl = baseUrl;
    
    this.client = axios.create({
      baseURL: baseUrl,
      headers: defaultHeaders || {},
      timeout: 30000,
    });

    this.setupAuth(auth);
    this.setupInterceptors();
  }

  private setupAuth(auth?: AuthConfig): void {
    if (!auth) return;

    switch (auth.type) {
      case 'bearer':
        if (auth.token) {
          this.client.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
        }
        break;
      case 'basic':
        if (auth.username && auth.password) {
          const credentials = Buffer.from(`${auth.username}:${auth.password}`).toString('base64');
          this.client.defaults.headers.common['Authorization'] = `Basic ${credentials}`;
        }
        break;
      case 'api-key':
        if (auth.apiKey && auth.apiKeyHeader) {
          this.client.defaults.headers.common[auth.apiKeyHeader] = auth.apiKey;
        }
        break;
    }
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      config => {
        logger.debug(`[HTTP] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      error => {
        logger.error('[HTTP] Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      response => {
        logger.debug(`[HTTP] Response: ${response.status} ${response.statusText}`);
        return response;
      },
      error => {
        if (error.response) {
          logger.error(`[HTTP] Response error: ${error.response.status} ${error.response.statusText}`);
        } else if (error.request) {
          logger.error('[HTTP] No response received');
        } else {
          logger.error('[HTTP] Request setup error:', error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  async request(request: ApiRequest): Promise<ApiResponse> {
    const startTime = Date.now();

    try {
      const config: AxiosRequestConfig = {
        method: request.method,
        url: request.url,
        headers: request.headers || {},
        data: request.body,
        timeout: request.timeout || 30000,
      };

      const response: AxiosResponse = await this.client.request(config);
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      return {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers as Record<string, string>,
        data: response.data,
        responseTime,
        size: JSON.stringify(response.data).length,
      };
    } catch (error: any) {
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      if (error.response) {
        return {
          status: error.response.status,
          statusText: error.response.statusText,
          headers: error.response.headers || {},
          data: error.response.data,
          responseTime,
          size: error.response.data ? JSON.stringify(error.response.data).length : 0,
        };
      }

      throw error;
    }
  }

  async get(url: string, headers?: Record<string, string>): Promise<ApiResponse> {
    return this.request({ method: 'GET', url, headers: headers || {} });
  }

  async post(url: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse> {
    return this.request({ method: 'POST', url, body, headers: headers || {} });
  }

  async put(url: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse> {
    return this.request({ method: 'PUT', url, body, headers: headers || {} });
  }

  async patch(url: string, body?: any, headers?: Record<string, string>): Promise<ApiResponse> {
    return this.request({ method: 'PATCH', url, body, headers: headers || {} });
  }

  async delete(url: string, headers?: Record<string, string>): Promise<ApiResponse> {
    return this.request({ method: 'DELETE', url, headers: headers || {} });
  }

  setDefaultHeader(key: string, value: string): void {
    this.client.defaults.headers.common[key] = value;
  }

  removeDefaultHeader(key: string): void {
    delete this.client.defaults.headers.common[key];
  }

  setTimeout(timeout: number): void {
    this.client.defaults.timeout = timeout;
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }
}
