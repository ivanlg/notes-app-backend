import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';

const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4318/v1/traces',
});

const sdk = new NodeSDK({
  serviceName: 'notes-backend-local',
  spanProcessors: [new BatchSpanProcessor(traceExporter)],
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

console.log('OpenTelemetry initialized');

process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(() => console.log('OpenTelemetry shut down'))
    .catch((err) => console.error('Error shutting down OpenTelemetry', err))
    .finally(() => process.exit(0));
});

process.on('SIGINT', () => {
  sdk
    .shutdown()
    .then(() => console.log('OpenTelemetry shut down'))
    .catch((err) => console.error('Error shutting down OpenTelemetry', err))
    .finally(() => process.exit(0));
});
