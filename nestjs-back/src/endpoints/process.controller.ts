import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { OperateService } from '../services/operate.service';

@Controller('/api/process')
export class ProcessController {
  constructor(private readonly operateService: OperateService) {}
  
  @Get('definition/latest')
  async processDefs(){
    return await this.operateService.processDefinitions()
  }
  
  @Post(':bpmnProcessId/start')
  startProcess(@Param('bpmnProcessId') bpmnProcessId:string, @Body() variables:any): any {
    //instance = await zeebe_client.run_process(bpmn_process_id=bpmnProcessId, variables=variables)
    //return instance;
	return {};
  }
}
