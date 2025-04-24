// src/data-source.ts
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();
import { UserEntity } from 'src/users/entities/user.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
import { ShippingEntity } from 'src/orders/entities/shipping.entity';
import { OrderProductsEntity } from 'src/orders/entities/order-products.entity';
const { DataSource } = require("typeorm");


export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserEntity,CategoryEntity,ProductEntity, ReviewEntity,OrderEntity,ShippingEntity,OrderProductsEntity],
  migrations: [join(__dirname, 'database', 'migrations/*{.ts,.js}')],
  synchronize: true, 
};

 const AppDataSource = new DataSource(dataSourceOptions);
 AppDataSource.initialize();
export default AppDataSource;
  