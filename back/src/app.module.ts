import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataProviderModule } from './data-provider/data-provider.module';

@Module({
  imports: [DataProviderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
