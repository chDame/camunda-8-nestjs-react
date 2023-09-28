import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('/api/auth')
export class AuthenticationController {
  constructor(private readonly appService: AppService) {}

  @Get('logout')
  logout(): any {
    return {"result":"done"};
  }
  
  @Post('login')
  login(@Body() auth: any): any {
    auth.profile="Admin";
    auth.token="someToken";
    auth.groups=["group1","group2"];
    
    return auth;
  }
}
