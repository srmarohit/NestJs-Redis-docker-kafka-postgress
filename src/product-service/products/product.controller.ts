import { Controller } from "@nestjs/common";
import { MessagePattern, EventPattern } from "@nestjs/microservices";

@Controller('products')
export class ProductController {
  // Define your product-related endpoints here
  @MessagePattern('get_product')
  getProduct(data: any): any {
    // Implement logic to retrieve a product based on the provided data
    return { message: 'Product retrieved successfully', data };
  }

  @EventPattern('create_product')
  createProduct(data: any): any {
    // Implement logic to create a new product based on the provided data
    return { message: 'Product created successfully', data };
  }

    @EventPattern('order.created')
  async updateStock(order: { id: number; productId: number }) {
    console.log('Checking stock for the product: ', order.productId);

    console.log('Stock Updated');
  }

}