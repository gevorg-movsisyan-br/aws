import { NestFactory } from '@nestjs/core';
import { setupExceptionFilters } from './common/app/setupExceptionFilters';
import { setupPipes } from './common/app/setupPipes';
import { ConfigService } from '@nestjs/config';
import { Environment } from './common/constants/environment';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get(Environment.PORT);

  app.enableCors();

  setupPipes(app);
  setupExceptionFilters(app);

  await app.listen(port);

  return port;
}

bootstrap().then((port) => {
  console.log('-----------------------------------------------------------');
  console.log(`  API started on port ${port}`);
  console.log('-----------------------------------------------------------');
});
