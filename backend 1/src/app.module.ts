import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        database: "microservice1",
        password: "1111",
        entities: [],
        autoLoadEntities: true,
        synchronize: true,
    }),
    ProductModule
],
  controllers: [],
  providers: [],
})
export class AppModule {}
