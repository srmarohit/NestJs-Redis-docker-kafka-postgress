import { Module } from '@nestjs/common';
import { ProductServiceService } from './product-service.service';
import { ProductServiceController } from './product-service.controller';

@Module({
  controllers: [ProductServiceController],
  providers: [ProductServiceService],
})
export class ProductServiceModule {}
