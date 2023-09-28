import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthenticationController } from './endpoints/authentication.controller';
import { ProcessController } from './endpoints/process.controller';
import { FormController } from './endpoints/form.controller';
import { FormEditionController } from './endpoints/formEdition.controller';
import { MailEditionController } from './endpoints/mailEdition.controller';
import { TaskController } from './endpoints/task.controller';
import { AppService } from './services/app.service';
import { OperateService } from './services/operate.service';
import { FormService } from './services/form.service';
import { MailService } from './services/mail.service';
import { TasklistService } from './services/tasklist.service';

@Module({
  imports: [],
  controllers: [AppController, AuthenticationController, FormController, ProcessController, FormEditionController, MailEditionController, TaskController],
  providers: [AppService, OperateService, FormService, MailService, TasklistService],
})
export class AppModule {}
