import { HttpException, HttpStatus } from '@nestjs/common';

export class AiProviderException extends HttpException {
  constructor(message: string, cause?: Error) {
    super(message, HttpStatus.SERVICE_UNAVAILABLE, { cause });
  }
}

export class AiTimeoutException extends AiProviderException {
  constructor(timeoutMs: number) {
    super(`AI Provider timed out after ${timeoutMs}ms`);
  }
}
