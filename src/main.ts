// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import helmet from 'helmet';
// import { Logger, ValidationPipe } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

// async function bootstrap() {
//   const logger = new Logger('Bootstrap');

//   try {
//     const app = await NestFactory.create(AppModule);
//     const configService = app.get(ConfigService);

//     // Security middleware
//     app.use(helmet());

//     const allowedOrigins = configService.get<string[]>('allowedOrigins', ['http://localhost:3000']);
//     app.enableCors({
//       origin: allowedOrigins,
//       methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
//       credentials: true,
//     });

//     // Global pipes
//     app.useGlobalPipes(
//       new ValidationPipe({
//         whitelist: true,
//         transform: true,
//         forbidNonWhitelisted: true,
//       }),
//     );

//     // Swagger - only enable in non-production environments
//     if (configService.get('env') !== 'production') {
//       const config = new DocumentBuilder()
//         .setTitle('Prime Nestjs')
//         .setDescription('Boilerplate for nestjs')
//         .setVersion('2.0.0')
//         .addBearerAuth()
//         .addTag('api')
//         .build();

//       const document = SwaggerModule.createDocument(app, config);
//       SwaggerModule.setup('api', app, document);
//     }

//     const port = configService.get('port', 3000);
//     await app.listen(port);
//     logger.log(`Application is running on: http://localhost:${port}`);
//   } catch (error) {
//     logger.error('Error during application bootstrap:', error);
//     process.exit(1);
//   }
// }

// bootstrap();



/**
 * Above code is commented out as we gonna use microservices architecture, so we don't need to run the application as a standalone server. Instead, we will use message patterns and event patterns to handle requests and events in a distributed manner.
 * Learning Redis 
*/

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  console.log(`Server is running on http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();