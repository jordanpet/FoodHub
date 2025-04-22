import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { OrderProductsEntity } from 'src/orders/entities/order-products.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { ShippingEntity } from 'src/orders/entities/shipping.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (ConfigService: ConfigService) => ({
          type: 'mysql',
          host: ConfigService.getOrThrow('DB_HOST'),
          port: +ConfigService.getOrThrow<number>('DB_PORT'), 
          username: ConfigService.getOrThrow('DB_USERNAME'),
          password: ConfigService.getOrThrow('DB_PASSWORD'),
          database: ConfigService.getOrThrow('DB_DATABASE'),
          entities: [UserEntity,CategoryEntity,ProductEntity, ReviewEntity,OrderEntity,ShippingEntity,OrderProductsEntity],
          migrations:['dist/db/migrations/*{.ts,.js}'],
          synchronize: true,
        }),
        inject: [ConfigService]
      }),
    ],
  })
  export class DatabaseModule {}
  