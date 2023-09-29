import { Controller, Injectable } from '@nestjs/common';
import {/*JobWorker,*/ ZeebeJob} from '../decorators/jobWorker';
import { ZeebeService } from '../services/zeebe.service';
import { MailService } from '../services/mail.service';
import { ZBClient, ZBWorkerTaskHandler, ZBWorker } from 'zeebe-node';

@Injectable()
export class MainWorkers {

  constructor(private readonly zeebeService: ZeebeService, private readonly mailService: MailService) {
    console.log(this.mailService.resolve("test"));
    let worker = this.zeebeService.initWorker('selectAssignee', this.selectAssignee);
	worker["mailService"] = this.mailService;
  }

  async selectAssignee(job: ZeebeJob) {
    let updatedVariables = Object.assign({}, job.variables, {
      paymentService: 'Did my job',
    });
	//, 'fr', job.variables
    await this.mailService.send('christophe.dame@camunda.com', 'subject', 'template');
    job.complete(updatedVariables);
  }
		
}
