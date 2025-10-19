import WebSocket from 'ws';
import { EventEmitter } from 'events';
import { logger } from '../../core/logger/logger';

export interface WebSocketMessage {
  type: string;
  data: any;
  timestamp: Date;
}

export class WebsocketClient extends EventEmitter {
  private ws: WebSocket | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;
  private reconnectDelay = 1000;
  private isConnected = false;

  constructor(url: string) {
    super();
    this.url = url;
  }

  async connect(headers?: Record<string, string>): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        logger.debug(`[WebSocket] Connecting to ${this.url}`);
        
        this.ws = new WebSocket(this.url, { headers });

        this.ws.on('open', () => {
          logger.info(`[WebSocket] Connected to ${this.url}`);
          this.isConnected = true;
          this.reconnectAttempts = 0;
          this.emit('connected');
          resolve();
        });

        this.ws.on('message', (data: WebSocket.Data) => {
          try {
            const message: WebSocketMessage = {
              type: 'message',
              data: JSON.parse(data.toString()),
              timestamp: new Date(),
            };
            logger.debug('[WebSocket] Message received');
            this.emit('message', message);
          } catch (error) {
            logger.error('[WebSocket] Failed to parse message:', error);
          }
        });

        this.ws.on('error', error => {
          logger.error('[WebSocket] Error:', error);
          this.emit('error', error);
          reject(error);
        });

        this.ws.on('close', () => {
          logger.info('[WebSocket] Connection closed');
          this.isConnected = false;
          this.emit('disconnected');
          
          if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnect(headers);
          }
        });

      } catch (error) {
        logger.error('[WebSocket] Connection failed:', error);
        reject(error);
      }
    });
  }

  private async reconnect(headers?: Record<string, string>): Promise<void> {
    this.reconnectAttempts++;
    logger.info(`[WebSocket] Reconnecting (attempt ${this.reconnectAttempts})...`);
    
    await new Promise(resolve => setTimeout(resolve, this.reconnectDelay));
    
    try {
      await this.connect(headers);
    } catch (error) {
      logger.error('[WebSocket] Reconnection failed:', error);
    }
  }

  send(data: any): void {
    if (!this.ws || !this.isConnected) {
      throw new Error('WebSocket is not connected');
    }

    try {
      const message = typeof data === 'string' ? data : JSON.stringify(data);
      this.ws.send(message);
      logger.debug('[WebSocket] Message sent');
    } catch (error) {
      logger.error('[WebSocket] Failed to send message:', error);
      throw error;
    }
  }

  close(): void {
    if (this.ws) {
      logger.info('[WebSocket] Closing connection');
      this.ws.close();
      this.ws = null;
      this.isConnected = false;
    }
  }

  isConnectionOpen(): boolean {
    return this.isConnected && this.ws?.readyState === WebSocket.OPEN;
  }

  setMaxReconnectAttempts(attempts: number): void {
    this.maxReconnectAttempts = attempts;
  }

  setReconnectDelay(delay: number): void {
    this.reconnectDelay = delay;
  }

  async waitForMessage(timeout = 5000): Promise<WebSocketMessage> {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Timeout waiting for message'));
      }, timeout);

      const messageHandler = (message: WebSocketMessage) => {
        clearTimeout(timeoutId);
        this.off('message', messageHandler);
        resolve(message);
      };

      this.on('message', messageHandler);
    });
  }
}
