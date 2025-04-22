import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "../enums/order-status.enum";
import { UserEntity } from "src/users/entities/user.entity";
import { ShippingEntity } from "./shipping.entity";
import { OrderProductsEntity } from "./order-products.entity";

@Entity({name: "orders"})
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id:number;

    @CreateDateColumn()
    orderAt:Date;

    @Column({type:"enum",enum:OrderStatus,default:OrderStatus.PROCRSSING})
    status:string;

    @Column({nullable:true})
    shippedAt:Date;

    @Column({nullable:true})
    deliveredAt:Date;

    @ManyToOne(()=>UserEntity,(user)=>user.ordersUpdateBy)
    updateBy:UserEntity

    @OneToOne(()=>ShippingEntity,(ship)=>ship.order,{cascade:true})
    @JoinColumn()
    shippingAddress:ShippingEntity;

    @OneToMany(()=>OrderProductsEntity,(orderProduct)=>orderProduct.order,{cascade:true})
    products: OrderProductsEntity[];

    @ManyToOne(()=>UserEntity,(user)=>user.orders)
    user:UserEntity;
}
