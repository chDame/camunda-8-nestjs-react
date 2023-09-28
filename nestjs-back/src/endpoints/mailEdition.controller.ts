import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { MailService } from '../services/mail.service';

@Controller('/api/edition/mails')
export class MailEditionController {
  constructor(private readonly mailService: MailService) {}

  @Get('names')
  list():string[] {
    return this.mailService.findNames();
  }
    
  @Post()
  save(@Body() mail:any): any {
    return this.mailService.save(mail);
  }

  @Get(':name')
  get(@Param('name') name:string):any {
    return this.mailService.findByName(name);
  }
    
  @Delete(':name')
  delete(@Param('name') name:string) {
    this.mailService.delete(name);
  }
}
