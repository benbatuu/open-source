import { MockRule, MockResponse } from '../../types';
import { logger } from '../../core/logger/logger';

export class MockHandler {
  private rules: Map<string, MockRule> = new Map();

  addRule(rule: MockRule): void {
    this.rules.set(rule.id, rule);
    logger.debug(`[Mock] Added rule: ${rule.name}`);
  }

  removeRule(ruleId: string): void {
    if (this.rules.delete(ruleId)) {
      logger.debug(`[Mock] Removed rule: ${ruleId}`);
    }
  }

  findMatchingRule(method: string, url: string): MockRule | undefined {
    for (const rule of this.rules.values()) {
      if (!rule.enabled) continue;

      if (rule.method.toUpperCase() !== method.toUpperCase()) continue;

      if (typeof rule.url === 'string') {
        if (url === rule.url || url.includes(rule.url)) {
          return rule;
        }
      } else if (rule.url instanceof RegExp) {
        if (rule.url.test(url)) {
          return rule;
        }
      }
    }

    return undefined;
  }

  async getMockResponse(method: string, url: string): Promise<MockResponse | null> {
    const rule = this.findMatchingRule(method, url);

    if (!rule) {
      return null;
    }

    // Simulate delay if configured
    if (rule.delay) {
      await new Promise(resolve => setTimeout(resolve, rule.delay));
    }

    logger.info(`[Mock] Returning mock response for ${method} ${url}`);
    return rule.response;
  }

  enableRule(ruleId: string): void {
    const rule = this.rules.get(ruleId);
    if (rule) {
      rule.enabled = true;
      logger.debug(`[Mock] Enabled rule: ${ruleId}`);
    }
  }

  disableRule(ruleId: string): void {
    const rule = this.rules.get(ruleId);
    if (rule) {
      rule.enabled = false;
      logger.debug(`[Mock] Disabled rule: ${ruleId}`);
    }
  }

  clearAll(): void {
    this.rules.clear();
    logger.debug('[Mock] Cleared all rules');
  }

  getAllRules(): MockRule[] {
    return Array.from(this.rules.values());
  }

  getRule(ruleId: string): MockRule | undefined {
    return this.rules.get(ruleId);
  }

  hasRule(ruleId: string): boolean {
    return this.rules.has(ruleId);
  }
}
