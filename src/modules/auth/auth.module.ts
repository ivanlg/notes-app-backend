import { Module } from '@nestjs/common';

import { PassportModule } from '@nestjs/passport';
import { APIKeyGuard } from 'src/guards/api-key.guard';
import { ClerkAuthGuard } from 'src/guards/clerk-auth.guard';
import { ClerkClientProvider } from 'src/modules/auth/providers/clerk-client.provider';
import { ClerkStrategy } from 'src/modules/auth/strategies/clerk.strategy';
import { APIKeyStrategy } from './strategies/api-key.strategy';

@Module({
  imports: [PassportModule],
  providers: [
    ClerkStrategy,
    ClerkClientProvider,
    ClerkAuthGuard,
    APIKeyStrategy,
    APIKeyGuard,
  ],
  exports: [PassportModule],
})
export class AuthModule {}
