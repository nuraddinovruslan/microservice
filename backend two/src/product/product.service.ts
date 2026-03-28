import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepo: Repository<Product>,

  @Inject("MATH_SERVICE") private readonly client: ClientProxy
) {}
  async create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto)
    return await this.productRepo.save(product)
  }

  async findAll() {
    this.client.emit("hello1", "Hello from backend 1")
    return await this.productRepo.find()
  }

 async findOne(id: number) {
    const foundedProduct = await this.productRepo.findOne({where: {id}})
    if(!foundedProduct) throw new NotFoundException()
    return foundedProduct
  }

 async update(id: number, updateProductDto: UpdateProductDto) {
  const foundedProduct = await  this.productRepo.findOne({where: {id}})
  if(!foundedProduct) throw new NotFoundException()
    return await this.productRepo.update(id, updateProductDto)
  }

  async remove(id: number) {
    const foundedProduct = await this.productRepo.findOne({where: {id}})
    if(!foundedProduct) throw new NotFoundException()
    return this.productRepo.delete(id)
  }
}
