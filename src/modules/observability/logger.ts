import pino from 'pino';
import { trace } from '@opentelemetry/api';

function getTraceContext() {
  const span = trace.getActiveSpan();
  if (!span) return {};

  const ctx = span.spanContext();

  return {
    traceId: ctx.traceId,
    spanId: ctx.spanId,
  };
}

const isDev = process.env.NODE_ENV !== 'production';

export const logger = pino({
  level: 'debug',

  // base fields always included
  base: undefined,

  mixin() {
    return getTraceContext();
  },

  transport: isDev
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
        },
      }
    : undefined,
});
