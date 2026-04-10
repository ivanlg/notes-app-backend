import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { PinoLoggerService } from './pino-logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();

    const request = context.switchToHttp().getRequest<Request>();
    const { method, url } = request;

    this.logger.log({
      message: 'incoming request',
      method,
      url,
    });

    return next.handle().pipe(
      tap({
        next: (): void => {
          this.logger.log({
            message: 'request completed',
            method,
            url,
            durationMs: Date.now() - now,
          });
        },
        error: (err: unknown): void => {
          const trace =
            err instanceof Error
              ? err.stack
              : typeof err === 'string'
                ? err
                : undefined;

          this.logger.error(
            {
              message: 'request failed',
              method,
              url,
              durationMs: Date.now() - now,
            },
            trace,
          );
        },
      }),
    );
  }
}
