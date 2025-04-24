import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderProductsEntity } from './entities/order-products.entity';
import { ShippingEntity } from './entities/shipping.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ProductsService } from 'src/products/products.service';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderStatus } from './enums/order-status.enum';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(OrderEntity) 
  private readonly orderRepository:Repository<OrderEntity>,
  @InjectRepository(OrderProductsEntity) 
  private readonly orderProductionRepository:Repository<OrderProductsEntity>,
  @Inject(forwardRef(()=>ProductsService)) private readonly productService:ProductsService
){}
  async create(createOrderDto: CreateOrderDto,currentUser:UserEntity):Promise<OrderEntity> {
    const shippingEntity = new ShippingEntity();
    Object.assign(shippingEntity,createOrderDto.shippingAddress)

    const orderEntity = new OrderEntity();
    orderEntity.shippingAddress = shippingEntity;
    orderEntity.user=currentUser

    const orderEnt = await this.orderRepository.save(orderEntity);

    let orderProductionEntity:{
      order: OrderEntity,
      product: ProductEntity,
      product_quantity:number,
      product_unit_price:number
    }[]=[]
    for(let i=0;i<createOrderDto.orderedProducts.length;i++){
      const order=orderEnt;
      const product=await this.productService.findOne(createOrderDto.orderedProducts[i].id);
      const product_quantity=createOrderDto.orderedProducts[i].product_qauntity;
      const product_unit_price=createOrderDto.orderedProducts[i].product_unit_price;
      orderProductionEntity.push({order,product,product_quantity,product_unit_price});
    }
    const orderProduct = await this.orderProductionRepository
    .createQueryBuilder()
    .insert()
    .into(OrderProductsEntity).values(orderProductionEntity)
    .execute();
    return  await this.findOne(orderEnt.id);
  }

  async findAll(): Promise<OrderEntity[]> {
    return await this.orderRepository.find({
      relations: {
        shippingAddress:true,
        user: true,
        products:{product: true},
      },
    });
  }

  async findOne(id: number):Promise<OrderEntity> {
    return await this.orderRepository.findOne({
      where: { id },
      relations: {
        shippingAddress:true,
        user: true,
        products:{product: true},
      },
    });
  }

  async findOneByProductId(id:number){
    return await this.orderProductionRepository.findOne({
      relations:{ product:true },
      where: { product: { id: id } },
    });
  }

  async update(id: number, updateOrderStatusDto: UpdateOrderStatusDto,currentUser:UserEntity) {
    let order = await this.findOne(id);
    if(!order) throw new NotFoundException('order not found')
      if((order.status === OrderStatus.DELIVERED)||(order.status === OrderStatus.CANCELED)){
        throw new BadRequestException(`order already ${order.status}`);
      }

      if(order.status === OrderStatus.PROCRSSING && updateOrderStatusDto.status !== OrderStatus.SHIPPED){
        throw new BadRequestException(`Cannot move to "${updateOrderStatusDto.status}" before shipping`);
      }

      if((updateOrderStatusDto.status === OrderStatus.SHIPPED)&&(order.status === OrderStatus.SHIPPED)){
        return order;
      }
      if(updateOrderStatusDto.status === OrderStatus.SHIPPED){
        order.shippedAt=new Date();
      }
      order.status = updateOrderStatusDto.status;
      order.updateBy = currentUser;
      order = await this.orderRepository.save(order)
      if(updateOrderStatusDto.status === OrderStatus.DELIVERED){
        await this.stockUpdate(order, OrderStatus.DELIVERED);
      }
      return order;
  }
  async cancelled(id:number,currentUser:UserEntity){
    let order = await this.findOne(id);
    if(!order) throw new NotFoundException('Order not found')

      if(order.status === OrderStatus.CANCELED) return order;
      order.status = OrderStatus.CANCELED;
      order.updateBy = currentUser;
      order = await this.orderRepository.save(order);
      await this.stockUpdate(order,OrderStatus.CANCELED)
      return order;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async stockUpdate(order:OrderEntity,status:string){
    for(const op of order.products){
      await this.productService.updateStock(op.product.id,op.product_quantity,status)
    }
  }
}
