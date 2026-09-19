// import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
// import { AppService } from './app.service';
// import { JwtAuthGuard } from './auth/strategy/jwt-auth.guard';
// import { RolesGuard } from './auth/strategy/roles.guard';
// import { Roles } from './custom.decorator';
// import { Role } from './users/enums/role.enum';

import { InjectQueue } from '@nestjs/bullmq';
import { Controller, Get, Inject, Post } from '@nestjs/common';
import { Queue } from 'bullmq';

// @Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): { message: string } {
//     return this.appService.getHello();
//   }

//   @Get('/health-check')
//   healthCheck(): { message: string } {
//     return this.appService.healthCheck();
//   }

//   @Post('/echo')
//   @UseGuards(JwtAuthGuard)
//   echo(@Body() body: Record<string, unknown>) {
//     return body;
//   }

//   @Post('/premium-echo')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles(Role.premium)
//   premiumEcho(@Body() body: Record<string, unknown>) {
//     return body;
//   }
// }

@Controller()
export class AppController {
  constructor(@InjectQueue('video') private readonly videoQueue: Queue) {}

  @Get()
  getHello(): { message: string } {
    return { message: 'Hello World!' };
  }

  @Get('process')
  async processVideo() {
    await this.videoQueue.add(
      'process', // Job name
      { filename: 'video.mp4', fileType: 'mp4' },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    );
    return { message: 'Video processing job added to the queue.' };
  }

  @Get('compress')
  async compressVideo() {
    await this.videoQueue.add(
      'compress', // Job name
      { filename: 'video.mp4', fileType: 'mp4' },
      {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
      },
    );
    return { message: 'Video compression job added to the queue.' };
  }
}
