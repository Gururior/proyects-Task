import { Controller, Get, UseGuards, Request, Post } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtected(@Request() req) {
    return `This is a protected route. User email: ${req.user.email}`;
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  postProtected(@Request() req) {
    return `This is a protected route. User email: ${req.user.email}`;
  }
}