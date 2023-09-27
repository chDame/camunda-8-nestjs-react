import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthenticationController } from './endpoints/authentication.controller';
import { ProcessController } from './endpoints/process.controller';
import { FormController } from './endpoints/form.controller';
import { AppService } from './services/app.service';
import { OperateService } from './services/operate.service';
import { FormService } from './services/form.service';

@Module({
  imports: [],
  controllers: [AppController, AuthenticationController, FormController, ProcessController],
  providers: [AppService, OperateService, FormService],
})
export class AppModule {}
