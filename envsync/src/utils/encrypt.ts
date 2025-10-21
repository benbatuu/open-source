import * as crypto from 'crypto';
import { EncryptionService } from '../types';

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;

export class CryptoService implements EncryptionService {
  private key: Buffer;

  constructor(secretKey?: string) {
    if (!secretKey) {
      throw new Error('Encryption key is required. Set ENVSYNC_SECRET_KEY environment variable or provide a key.');
    }
    this.key = this.deriveKey(secretKey);
  }

  private deriveKey(secretKey: string): Buffer {
    return crypto.scryptSync(secretKey, 'envsync-salt', 32);
  }

  encrypt(data: string): string {
    try {
      const iv = crypto.randomBytes(IV_LENGTH);
      const cipher = crypto.createCipheriv(ALGORITHM, this.key, iv);

      let encrypted = cipher.update(data, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      // Combine iv + encrypted data
      const combined = Buffer.concat([
        iv,
        Buffer.from(encrypted, 'hex')
      ]);

      return combined.toString('base64');
    } catch (error) {
      throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  decrypt(encryptedData: string): string {
    try {
      const combined = Buffer.from(encryptedData, 'base64');
      
      // Extract components
      const iv = combined.subarray(0, IV_LENGTH);
      const encrypted = combined.subarray(IV_LENGTH);

      const decipher = crypto.createDecipheriv(ALGORITHM, this.key, iv);

      let decrypted = decipher.update(encrypted, undefined, 'utf8');
      decrypted += decipher.final('utf8');

      return decrypted;
    } catch (error) {
      throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  generateKey(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  static generateSecretKey(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
