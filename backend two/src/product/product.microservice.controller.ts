import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller('product')
export class ProductMicroserviceController {
  constructor(private readonly productService: ProductService) {}

  @EventPattern("create_product")
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

//   @MessagePattern("nom")
//   find(msg: any) {
//     console.log(msg);
//     return "Xabarni oldim"
//   }

   @EventPattern("hello2")
  findAll(dto: CreateProductDto) {
    return dto
  }


  @EventPattern("find_one")
  findOne(data: any) {
    return this.productService.findOne(data.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
