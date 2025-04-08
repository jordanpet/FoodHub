// src/data-source.ts
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();
import { UserEntity } from 'src/users/entities/user.entity';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
const { DataSource } = require("typeorm");


export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [UserEntity,CategoryEntity,ProductEntity],
  migrations: [join(__dirname, 'database', 'migrations/*{.ts,.js}')],
  synchronize: true, 
};

 const AppDataSource = new DataSource(dataSourceOptions);
export default AppDataSource;
  