import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Context, Handler } from 'aws-lambda';
import express from 'express';

import { AppModule } from './app.module';
import serverlessExpress from '@codegenie/serverless-express';
import { setupPipes } from './common/app/setupPipes';
import { setupExceptionFilters } from './common/app/setupExceptionFilters';

let cachedServer: Handler;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    setupPipes(nestApp);
    setupExceptionFilters(nestApp);

    nestApp.enableCors();

    await nestApp.init();

    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer;
}

const handler = async (event: any, context: Context, callback: any) => {
  const server = await bootstrap();
  return server(event, context, callback);
};

module.exports.handler = handler;
