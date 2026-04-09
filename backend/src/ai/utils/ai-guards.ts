import { AiProviderException } from '../exceptions/ai.exception';
import { HttpException, HttpStatus } from '@nestjs/common';

export class CircuitBreaker {
  private failureCount = 0;
  private nextTryTime = 0;

  constructor(
    private readonly failureThreshold: number = 5,
    private readonly resetTimeoutMs: number = 30000,
  ) {}

  async fire<T>(action: () => Promise<T>): Promise<T> {
    if (Date.now() < this.nextTryTime) {
      throw new AiProviderException(
        'Circuit breaker is OPEN. AI service is temporarily overloaded.',
      );
    }

    try {
      const result = await action();
      this.failureCount = 0;
      return result;
    } catch (e) {
      this.failureCount++;
      if (this.failureCount >= this.failureThreshold) {
        this.nextTryTime = Date.now() + this.resetTimeoutMs;
      }
      throw e;
    }
  }
}

export class RateLimiter {
  private requests: number[] = [];

  constructor(
    private readonly maxRequests: number = 10,
    private readonly timeWindowMs: number = 60000,
  ) {}

  checkLimit(): void {
    const now = Date.now();
    this.requests = this.requests.filter(
      (time) => now - time < this.timeWindowMs,
    );

    if (this.requests.length >= this.maxRequests) {
      throw new AiProviderException(
        'Rate limit exceeded. Please try again later.',
      );
    }

    this.requests.push(now);
  }
}

export function getSafeErrorResponse(error: any): string {
  if (error && error.message) {
    if (error.message.includes('Circuit breaker is OPEN')) {
      return 'Hệ thống AI đang tạm thời quá tải. Vui lòng thử lại sau ít phút.';
    }
    if (error.message.includes('Rate limit exceeded')) {
      return 'Bạn đã thực hiện quá nhiều yêu cầu. Vui lòng thử lại sau.';
    }
    if (error.message.includes('Guardrail')) {
      return error.message; // Let guardrail messages pass through
    }
  }
  return 'Đã có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại sau.';
}

export function handleAiError(error: any): never {
  if (error instanceof HttpException) {
    throw error;
  }
  const msg = getSafeErrorResponse(error);
  throw new HttpException(msg, HttpStatus.SERVICE_UNAVAILABLE);
}
