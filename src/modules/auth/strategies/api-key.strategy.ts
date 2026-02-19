import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-custom';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { NOTES_API_KEY_HEADER } from '../constants';

@Injectable()
export class APIKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private readonly configService: ConfigService) {
    super();
  }

  validate(req: Request) {
    const apiKey = req.header(NOTES_API_KEY_HEADER);

    if (!apiKey) {
      throw new UnauthorizedException('No API-KEY provided');
    }

    if (apiKey !== this.configService.get<string>('NOTES_API_KEY')) {
      throw new UnauthorizedException('Invalid API-KEY');
    }

    return { isAPIKeyAuthorizedUser: true };
  }
}
