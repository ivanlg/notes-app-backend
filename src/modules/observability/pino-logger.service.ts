import { Injectable, LoggerService } from '@nestjs/common';
import { logger } from './logger';

@Injectable()
export class PinoLoggerService implements LoggerService {
  log(message: any, context?: string) {
    logger.info(this.format(message, context));
  }

  error(message: any, trace?: string, context?: string) {
    logger.error({
      ...this.format(message, context),
      trace,
    });
  }

  warn(message: any, context?: string) {
    logger.warn(this.format(message, context));
  }

  debug(message: any, context?: string) {
    logger.debug(this.format(message, context));
  }

  verbose(message: any, context?: string) {
    logger.trace(this.format(message, context));
  }

  private format(message: any, context?: string): any {
    return typeof message === 'object'
      ? { ...message, context }
      : // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        { message, context };
  }
}
