import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OperateService } from '../services/operate.service';
import { ZeebeService } from '../services/zeebe.service';

@Controller('/api/process')
export class ProcessController {
  constructor(private readonly operateService: OperateService, private readonly zeebeService: ZeebeService) {}
  
  @Get('definition/latest')
  async processDefs(){
    return await this.operateService.processDefinitions()
  }
  
  @Post(':bpmnProcessId/start')
  async startProcess(@Param('bpmnProcessId') bpmnProcessId:string, @Body() variables:any) {
    return await this.zeebeService.startProcess(bpmnProcessId, variables);
    
    //instance = await zeebe_client.run_process(bpmn_process_id=bpmnProcessId, variables=variables)
    //return instance;
	//return outcome;
  }
}
