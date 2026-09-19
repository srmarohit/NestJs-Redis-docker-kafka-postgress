import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ProductServiceModule } from './product-service.module';

async function bootstrap() {
  const tcpMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(ProductServiceModule, {
      transport: Transport.TCP,
      options: {
        port: 4001,
      },
    });
  const redisMicroservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(ProductServiceModule, {
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      },
    });

  await Promise.all([tcpMicroservice.listen(), redisMicroservice.listen()]);
  // await app.listen();
  console.log(
    'Product Microservice is running on port 4001, listen to redis events',
  );
}
bootstrap();