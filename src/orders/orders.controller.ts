import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthenticationGuard } from 'src/utility/guards/authntication.guard';
import { CurrentUser } from 'src/utility/decorator/current_user.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { OrderEntity } from './entities/order.entity';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';
import { Roles } from 'src/utility/common/user.role.enum';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @CurrentUser() currentUser:UserEntity):Promise<OrderEntity> {
    return await this.ordersService.create(createOrderDto, currentUser);
  }

  @Get()
 async findAll():Promise<OrderEntity[]> {
    return await this.ordersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string):Promise<OrderEntity> {
    return await this.ordersService.findOne(+id);
  }
  @UseGuards(AuthenticationGuard,AuthorizeGuard([Roles.ADMIN]))
  @Put(':id')
  async update(@Param('id') id: string, 
  @Body()updateOrderStatusDto: UpdateOrderStatusDto, 
  @CurrentUser()CurrentUser:UserEntity) {
    return await this.ordersService.update(+id, updateOrderStatusDto,CurrentUser);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
