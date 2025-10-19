import { TestLogger } from './logger';

describe('TestLogger', () => {
  let logger: TestLogger;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TestLogger('info', 'Test');
    consoleSpy = jest.spyOn(console, 'info').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('log levels', () => {
    it('should log info messages when level is info', () => {
      logger.info('Test message');
      expect(consoleSpy).toHaveBeenCalled();
    });

    it('should not log debug messages when level is info', () => {
      const debugSpy = jest.spyOn(console, 'debug').mockImplementation();
      logger.debug('Debug message');
      expect(debugSpy).not.toHaveBeenCalled();
      debugSpy.mockRestore();
    });

    it('should log all messages when level is debug', () => {
      logger.setLevel('debug');
      const debugSpy = jest.spyOn(console, 'debug').mockImplementation();
      
      logger.debug('Debug message');
      expect(debugSpy).toHaveBeenCalled();
      
      debugSpy.mockRestore();
    });
  });

  describe('message formatting', () => {
    it('should format messages with timestamp and level', () => {
      logger.info('Test message');
      
      const call = consoleSpy.mock.calls[0];
      const message = call[0];
      
      expect(message).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\]/);
      expect(message).toContain('INFO');
      expect(message).toContain('[Test]');
      expect(message).toContain('Test message');
    });
  });

  describe('setters', () => {
    it('should update log level', () => {
      logger.setLevel('error');
      expect(logger['level']).toBe('error');
    });

    it('should update prefix', () => {
      logger.setPrefix('NewPrefix');
      expect(logger['prefix']).toBe('NewPrefix');
    });
  });
});
