import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { FormService } from '../services/form.service';

@Controller('/api/edition/forms')
export class FormEditionController {
  constructor(private readonly formService: FormService) {}

  @Get('names')
  forms():string[] {
    return this.formService.findNames();
  }
    
  @Post()
  saveForm(@Body() form:any): any {
    return this.formService.saveForm(form);
  }

  @Get(':name')
  getForm(@Param('name') name:string):any {
    return this.formService.findByName(name);
  }
    
  @Delete(':name')
  delete(@Param('name') name:string) {
    this.formService.delete(name);
  }
}
