import { Injectable } from '@nestjs/common';
import { Settings } from '../settings';
import { ZBClient, ZBWorkerTaskHandler } from 'zeebe-node';

@Injectable()
export class ZeebeService {
  settings: Settings = new Settings();

  zbc = new ZBClient({
	camundaCloud: {
		clientId: this.settings.clientId,
		clientSecret: this.settings.clientSecret,
		clusterId: this.settings.clusterId,
		clusterRegion: this.settings.clusterRegion
	},
  });
  constructor() {}
  
  async initWorker(taskType:string, handler:any) {
	this.zbc.createWorker({
		taskType: taskType,
		taskHandler: handler,
		// the number of simultaneous tasks this worker can handle
		maxJobsToActivate: 10,
		// the amount of time the broker should allow this worker to complete a task
		timeout: 300,
		onReady: () => console.log('Worker '+taskType+' connected!'),
		onConnectionError: () => console.log('Worker '+taskType+' disconnected!')
	});
  }
  
  async startProcess(bpmnProcessId:string, variables:any) {
    return await this.zbc.createProcessInstanceWithResult(bpmnProcessId, variables);
  }
}
