import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasklistService } from '../services/tasklist.service';

@Controller('/api/tasks')
export class TaskController {
  constructor(private readonly tasklistService: TasklistService) {}
  
  
  @Get()
  async tasks() {
    return await this.tasklistService.readTasks({});
  }
  @Post('search')
  async searchTasks(@Body() search:any){
    return await this.tasklistService.readTasks(search) ;
  }
  @Get(':task_id/claim/:assignee')
  async claim(@Param('taskId') taskId:number, @Param('assignee') assignee:string) {
    return await this.tasklistService.claim(taskId, assignee);
  }
  @Get(':taskId/unclaim')
  async unclaim(@Param('taskId') taskId:number) {
    return await this.tasklistService.unclaim(taskId);
  }
  @Post(':taskId')
  async getTask(@Param('taskId') taskId:number, @Body() variables:any) {
    return await this.tasklistService.complete(taskId, variables);
  }
}
