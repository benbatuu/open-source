import { CryptoService } from '../utils/encrypt';

describe('CryptoService', () => {
  const testKey = 'test-secret-key-12345678901234567890';
  let cryptoService: CryptoService;

  beforeEach(() => {
    cryptoService = new CryptoService(testKey);
  });

  describe('encrypt and decrypt', () => {
    it('should encrypt and decrypt data correctly', () => {
      const originalData = 'sensitive-data-123';
      
      const encrypted = cryptoService.encrypt(originalData);
      const decrypted = cryptoService.decrypt(encrypted);

      expect(encrypted).not.toBe(originalData);
      expect(decrypted).toBe(originalData);
    });

    it('should produce different encrypted values for the same input', () => {
      const data = 'test-data';
      
      const encrypted1 = cryptoService.encrypt(data);
      const encrypted2 = cryptoService.encrypt(data);

      expect(encrypted1).not.toBe(encrypted2);
      
      // But both should decrypt to the same value
      expect(cryptoService.decrypt(encrypted1)).toBe(data);
      expect(cryptoService.decrypt(encrypted2)).toBe(data);
    });

    it('should handle empty strings', () => {
      const data = '';
      
      const encrypted = cryptoService.encrypt(data);
      const decrypted = cryptoService.decrypt(encrypted);

      expect(decrypted).toBe(data);
    });

    it('should handle special characters', () => {
      const data = 'special-chars: !@#$%^&*()_+-=[]{}|;:,.<>?';
      
      const encrypted = cryptoService.encrypt(data);
      const decrypted = cryptoService.decrypt(encrypted);

      expect(decrypted).toBe(data);
    });

    it('should handle unicode characters', () => {
      const data = 'unicode: 🚀 中文 العربية русский';
      
      const encrypted = cryptoService.encrypt(data);
      const decrypted = cryptoService.decrypt(encrypted);

      expect(decrypted).toBe(data);
    });
  });

  describe('generateKey', () => {
    it('should generate a valid key', () => {
      const key = cryptoService.generateKey();
      
      expect(key).toBeDefined();
      expect(typeof key).toBe('string');
      expect(key.length).toBe(64); // 32 bytes = 64 hex characters
    });

    it('should generate different keys each time', () => {
      const key1 = cryptoService.generateKey();
      const key2 = cryptoService.generateKey();
      
      expect(key1).not.toBe(key2);
    });
  });

  describe('generateSecretKey', () => {
    it('should generate a valid secret key', () => {
      const secretKey = CryptoService.generateSecretKey();
      
      expect(secretKey).toBeDefined();
      expect(typeof secretKey).toBe('string');
      expect(secretKey.length).toBe(64); // 32 bytes = 64 hex characters
    });

    it('should generate different secret keys each time', () => {
      const key1 = CryptoService.generateSecretKey();
      const key2 = CryptoService.generateSecretKey();
      
      expect(key1).not.toBe(key2);
    });
  });

  describe('error handling', () => {
    it('should throw error when no key is provided', () => {
      expect(() => {
        new CryptoService('');
      }).toThrow('Encryption key is required');
    });

    it('should throw error when decrypting invalid data', () => {
      expect(() => {
        cryptoService.decrypt('invalid-encrypted-data');
      }).toThrow('Decryption failed');
    });
  });
});
