import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  if (!process.env.NEST_APP_STARTED) {
    const app = await NestFactory.create(AppModule);
    process.env.NEST_APP_STARTED = 'true';
    app.enableCors();
    console.log('Llamando appListen...');
    await app.listen(3200);
    console.log('appListen ejecutado');
  }
}
bootstrap();
