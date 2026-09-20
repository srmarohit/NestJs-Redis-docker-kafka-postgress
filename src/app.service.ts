import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class AppService {
  getHello(): { message: string } {
    return {
      message: 'Hello World!',
    };
  }

  @Cron(CronExpression.EVERY_10_MINUTES, { name: 'backup-db' }) // Runs every 5 seconds
  handleBackUpDBCron() {
    console.log('Cron job executed at:', new Date().toISOString());
  }

  @Interval(15000) // Runs every 15 seconds
  validateSessionCron() {
    console.log('Interval job executed at:', new Date().toISOString());
  }

  @Timeout(10000) // Runs once after 10 seconds
  clearTokensCron() {
    console.log('Timeout job executed at:', new Date().toISOString());
  }
}
