import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config';

export const moduleconfig: ConfigModuleOptions = {
  validationSchema: Joi.object({
    POSTGRES_HOST: Joi.string().required(),
    POSTGRES_PORT: Joi.number().required(),
    POSTGRES_USER: Joi.string().required(),
    POSTGRES_PASSWORD: Joi.string().required(),
    POSTGRES_DB: Joi.string(),
    PORT: Joi.number(),
    ENABLE_TEST_UTILS: Joi.string(),
  }),
  isGlobal: true,
};
