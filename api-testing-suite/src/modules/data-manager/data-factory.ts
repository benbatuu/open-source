import { logger } from '../../core/logger/logger';
import { v4 as uuidv4 } from 'uuid';

export type FactoryDefinition<T> = {
  [K in keyof T]: T[K] | (() => T[K]);
};

export class DataFactory<T = any> {
  private definition: FactoryDefinition<T>;
  private sequence = 0;

  constructor(definition: FactoryDefinition<T>) {
    this.definition = definition;
  }

  build(overrides?: Partial<T>): T {
    const data: any = {};

    for (const key in this.definition) {
      const value = this.definition[key];
      data[key] = typeof value === 'function' ? value() : value;
    }

    return { ...data, ...overrides } as T;
  }

  buildList(count: number, overrides?: Partial<T>): T[] {
    const list: T[] = [];
    for (let i = 0; i < count; i++) {
      list.push(this.build(overrides));
    }
    logger.debug(`Built ${count} items from factory`);
    return list;
  }

  buildWithSequence(overrides?: Partial<T>): T {
    this.sequence++;
    return this.build(overrides);
  }

  resetSequence(): void {
    this.sequence = 0;
  }

  getSequence(): number {
    return this.sequence;
  }

  static sequence(start = 0): () => number {
    let counter = start;
    return () => counter++;
  }

  static uuid(): string {
    return uuidv4();
  }

  static randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randomFloat(min: number, max: number, decimals = 2): number {
    return parseFloat((Math.random() * (max - min) + min).toFixed(decimals));
  }

  static randomString(length = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static randomEmail(): string {
    return `${this.randomString(8)}@example.com`;
  }

  static randomBoolean(): boolean {
    return Math.random() > 0.5;
  }

  static randomDate(start?: Date, end?: Date): Date {
    const startTime = start ? start.getTime() : Date.now() - 365 * 24 * 60 * 60 * 1000;
    const endTime = end ? end.getTime() : Date.now();
    return new Date(startTime + Math.random() * (endTime - startTime));
  }

  static randomElement<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)]!;
  }

  static randomElements<T>(array: T[], count: number): T[] {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, array.length));
  }
}

// Pre-defined factories
export class UserFactory extends DataFactory<{
  id: string;
  name: string;
  email: string;
  age: number;
  active: boolean;
  createdAt: Date;
}> {
  constructor() {
    super({
      id: () => DataFactory.uuid(),
      name: () => `User ${DataFactory.randomString(5)}`,
      email: () => DataFactory.randomEmail(),
      age: () => DataFactory.randomInt(18, 80),
      active: () => DataFactory.randomBoolean(),
      createdAt: () => DataFactory.randomDate(),
    });
  }
}

export class ProductFactory extends DataFactory<{
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}> {
  constructor() {
    super({
      id: () => DataFactory.uuid(),
      name: () => `Product ${DataFactory.randomString(5)}`,
      description: () => `Description for ${DataFactory.randomString(10)}`,
      price: () => DataFactory.randomFloat(10, 1000, 2),
      stock: () => DataFactory.randomInt(0, 100),
      category: () => DataFactory.randomElement(['Electronics', 'Clothing', 'Food', 'Books', 'Toys']),
    });
  }
}

export class OrderFactory extends DataFactory<{
  id: string;
  userId: string;
  items: string[];
  total: number;
  status: string;
  createdAt: Date;
}> {
  constructor() {
    super({
      id: () => DataFactory.uuid(),
      userId: () => DataFactory.uuid(),
      items: () => Array(DataFactory.randomInt(1, 5)).fill(null).map(() => DataFactory.uuid()),
      total: () => DataFactory.randomFloat(10, 500, 2),
      status: () => DataFactory.randomElement(['pending', 'processing', 'shipped', 'delivered']),
      createdAt: () => DataFactory.randomDate(),
    });
  }
}
