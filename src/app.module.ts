// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ScheduleModule } from '@nestjs/schedule';
// import { TasksModule } from './tasks/tasks.module';
// import { AuthModule } from './auth/auth.module';
// import { UsersModule } from './users/users.module';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { ProductServiceModule } from './product-service/product-service.module';
// import { OrdersModule } from './orders-services/orders.module';
// import configuration from './config';

import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';
import { VideoProcessor } from './app.worker';
import { VideoQueueEventListener } from './app-queue.events';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       load: [configuration],
//     }),
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       useFactory: (configService: ConfigService) => {
//         const dbConfig = configService.get('database');
//         if (!dbConfig) {
//           throw new Error('Database configuration is missing');
//         }
//         return dbConfig;
//       },
//       inject: [ConfigService],
//     }),
//     ScheduleModule.forRoot(),
//     AuthModule,
//     UsersModule,
//     TasksModule,
//     ProductServiceModule,
//     OrdersModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6380,
      },
      defaultJobOptions: {
        attempts: 3,
        delay: 5000,
      },
    }),
    BullModule.registerQueue(
      {
        name: 'video',
      },
      {
        name: 'my-queue2',
      },
    ),
  ],
  controllers: [AppController],
  providers: [VideoProcessor, VideoQueueEventListener],
})
export class AppModule {}
