import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { FoodModule } from './food/food.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrentUserMiddleware} from './utility/common/middleware/current-user.middleware';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersModule } from './orders/orders.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
}), DatabaseModule, FoodModule, UsersModule, CategoriesModule, ProductsModule, ReviewsModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(CurrentUserMiddleware)
    .forRoutes({path: '*', method:RequestMethod.ALL});
  }
}
