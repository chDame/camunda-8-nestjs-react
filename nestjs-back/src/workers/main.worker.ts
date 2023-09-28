import { Controller, Injectable } from '@nestjs/common';
import {/*JobWorker,*/ ZeebeJob} from '../decorators/jobWorker';
import { ZeebeService } from '../services/zeebe.service';

@Injectable()
export class MainWorkers {

  constructor(private readonly zeebeService: ZeebeService) {
    this.zeebeService.initWorker('selectAssignee', this.selectAssignee);
  }

  selectAssignee(job: ZeebeJob) {
    console.log('selectAssignee', job.variables);
    let updatedVariables = Object.assign({}, job.variables, {
      paymentService: 'Did my job',
    });
  
    job.complete(updatedVariables);
  }
		
}
