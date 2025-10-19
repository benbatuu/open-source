import express, { Express, Request, Response } from 'express';
import { Server } from 'http';
import { MockHandler } from './mock-handler';
import { MockRule } from '../../types';
import { logger } from '../../core/logger/logger';

export class MockServer {
  private app: Express;
  private server: Server | null = null;
  private port: number;
  private mockHandler: MockHandler;

  constructor(port = 3001) {
    this.port = port;
    this.app = express();
    this.mockHandler = new MockHandler();
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Logging middleware
    this.app.use((req: Request, _res: Response, next) => {
      logger.debug(`[MockServer] ${req.method} ${req.path}`);
      next();
    });
  }

  private setupRoutes(): void {
    // Catch-all route for mocking
    this.app.all('*', async (req: Request, res: Response) => {
      try {
        const mockResponse = await this.mockHandler.getMockResponse(req.method, req.path);

        if (mockResponse) {
          // Set headers
          if (mockResponse.headers) {
            Object.entries(mockResponse.headers).forEach(([key, value]) => {
              res.setHeader(key, value);
            });
          }

          // Send response
          res.status(mockResponse.status).json(mockResponse.body);
        } else {
          // No mock found
          res.status(404).json({
            error: 'No mock found',
            method: req.method,
            path: req.path,
          });
        }
      } catch (error) {
        logger.error('[MockServer] Error handling request:', error);
        res.status(500).json({
          error: 'Internal server error',
          message: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    });
  }

  async start(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(this.port, () => {
          logger.info(`[MockServer] Started on port ${this.port}`);
          resolve();
        });

        this.server.on('error', error => {
          logger.error('[MockServer] Failed to start:', error);
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.server) {
        resolve();
        return;
      }

      this.server.close(error => {
        if (error) {
          logger.error('[MockServer] Error stopping server:', error);
          reject(error);
        } else {
          logger.info('[MockServer] Stopped');
          this.server = null;
          resolve();
        }
      });
    });
  }

  addMock(rule: MockRule): void {
    this.mockHandler.addRule(rule);
  }

  removeMock(ruleId: string): void {
    this.mockHandler.removeRule(ruleId);
  }

  clearMocks(): void {
    this.mockHandler.clearAll();
  }

  getMocks(): MockRule[] {
    return this.mockHandler.getAllRules();
  }

  getPort(): number {
    return this.port;
  }

  isRunning(): boolean {
    return this.server !== null;
  }
}

export const createMockServer = (port?: number): MockServer => {
  return new MockServer(port);
};
