import { Injectable } from '@nestjs/common';

@Injectable()
export class AiPiiMinimizerService {
  /**
   * Redacts common PII patterns from text
   */
  minimize(text: string): string {
    if (!text) return text;

    let minimized = text;

    // Redact Vietnamese phone numbers (10 digits starting with 0, or +84)
    minimized = minimized.replace(
      /(?:\+84|0)[3|5|7|8|9][0-9]{8}\b/g,
      '[PHONE]',
    );

    // Redact Emails
    minimized = minimized.replace(
      /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      '[EMAIL]',
    );

    // Redact Vietnamese ID card numbers (CMND 9 digits or CCCD 12 digits)
    minimized = minimized.replace(
      /\b(?:\d{9}|\d{12})\b/g,
      '[ID_CARD]',
    );

    return minimized;
  }

  /**
   * Recursively minimizes string values in an object
   */
  minimizeObject<T>(obj: T): T {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
      return obj.map((item) => this.minimizeObject(item)) as any;
    }

    const result: any = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        result[key] = this.minimize(value);
      } else if (typeof value === 'object') {
        result[key] = this.minimizeObject(value);
      } else {
        result[key] = value;
      }
    }

    return result as T;
  }
}
