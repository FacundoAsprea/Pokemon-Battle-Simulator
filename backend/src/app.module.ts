import { Module } from '@nestjs/common';
import { DataProviderModule } from './data-provider/data-provider.module';
import { WebSocketModule } from './gateway/webSocket.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    DataProviderModule,
    WebSocketModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
})
export class AppModule {}
