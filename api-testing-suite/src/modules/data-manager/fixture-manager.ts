import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { logger } from '../../core/logger/logger';

export class FixtureManager {
  private fixtures: Map<string, any> = new Map();
  private fixturesDir: string;

  constructor(fixturesDir = './fixtures') {
    this.fixturesDir = fixturesDir;
  }

  loadFixture<T = any>(name: string): T {
    if (this.fixtures.has(name)) {
      return this.fixtures.get(name) as T;
    }

    const filePath = join(this.fixturesDir, `${name}.json`);
    
    if (!existsSync(filePath)) {
      throw new Error(`Fixture not found: ${name}`);
    }

    try {
      const content = readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);
      this.fixtures.set(name, data);
      logger.debug(`Loaded fixture: ${name}`);
      return data as T;
    } catch (error) {
      logger.error(`Failed to load fixture ${name}:`, error);
      throw error;
    }
  }

  loadAllFixtures(): Record<string, any> {
    if (!existsSync(this.fixturesDir)) {
      logger.warn(`Fixtures directory not found: ${this.fixturesDir}`);
      return {};
    }

    const files = readdirSync(this.fixturesDir).filter(f => f.endsWith('.json'));
    const fixtures: Record<string, any> = {};

    for (const file of files) {
      const name = file.replace('.json', '');
      fixtures[name] = this.loadFixture(name);
    }

    logger.info(`Loaded ${files.length} fixtures`);
    return fixtures;
  }

  saveFixture(name: string, data: any): void {
    const filePath = join(this.fixturesDir, `${name}.json`);
    
    try {
      writeFileSync(filePath, JSON.stringify(data, null, 2));
      this.fixtures.set(name, data);
      logger.debug(`Saved fixture: ${name}`);
    } catch (error) {
      logger.error(`Failed to save fixture ${name}:`, error);
      throw error;
    }
  }

  hasFixture(name: string): boolean {
    return this.fixtures.has(name) || existsSync(join(this.fixturesDir, `${name}.json`));
  }

  clearFixtures(): void {
    this.fixtures.clear();
    logger.debug('Cleared all fixtures from memory');
  }

  getFixture<T = any>(name: string): T | undefined {
    return this.fixtures.get(name) as T | undefined;
  }

  mergeFixtures(name1: string, name2: string): any {
    const fixture1 = this.loadFixture(name1);
    const fixture2 = this.loadFixture(name2);
    
    if (Array.isArray(fixture1) && Array.isArray(fixture2)) {
      return [...fixture1, ...fixture2];
    }
    
    if (typeof fixture1 === 'object' && typeof fixture2 === 'object') {
      return { ...fixture1, ...fixture2 };
    }
    
    throw new Error('Cannot merge fixtures of different types');
  }
}
