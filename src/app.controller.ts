import { Controller, Get } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Controller()
export class AppController {
  constructor(private scheduleRegistry: SchedulerRegistry) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get('create-cronjob')
  createCronJob(): string {
    // Logic to create a cron job dynamically
    const cronJob = new CronJob('*/5 * * * * *', () => {
      console.log('Cron job executed at:', new Date().toISOString());
    });

    this.scheduleRegistry.addCronJob('backup-db', cronJob);
    cronJob.start();
    return 'Cron job created!';
  }

  @Get('delete-cronjob')
  deleteCronJob(): string {
    // Logic to delete a cron job dynamically
    this.scheduleRegistry.deleteCronJob('backup-db');
    return 'Cron job deleted!';
  }

  @Get('list-cronjobs')
  listCronJobs(): string[] {
    // Logic to list all cron jobs
    const cronJobs = this.scheduleRegistry.getCronJobs();
    return Array.from(cronJobs.keys());
  }
}
