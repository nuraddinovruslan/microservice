import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { log } from 'console';

@Injectable()
export class ProductService {
  client: any;
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
    async create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto)
    this.client.emit("create_product", product)
    return await this.productRepo.save(product)
  }

  async findAll() {
    const product = await this.productRepo.find()
    this.client.emit("find_all", product)
    // this.client.send("nom", "shunchaki xabar").subscribe((data) => console.log(data))
    return product
  }

 async findOne(id: number) {
    const foundedProduct = await this.productRepo.findOne({where: {id}})
    if(!foundedProduct) throw new NotFoundException()
      this.client.emit("find_one", foundedProduct)
    return foundedProduct
  }

 async update(id: number, updateProductDto: UpdateProductDto) {
  const foundedProduct = await  this.productRepo.findOne({where: {id}})
  if(!foundedProduct) throw new NotFoundException()
    this.client.emit("update_product", foundedProduct)
    return await this.productRepo.update(id, updateProductDto)
  }

  async remove(id: number) {
    const foundedProduct = await this.productRepo.findOne({where: {id}})
    if(!foundedProduct) throw new NotFoundException()
      this.client.emit("delete_product", foundedProduct.id)
    return this.productRepo.delete(id)
  }
}
