import { title } from "process";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { OrderProductsEntity } from "src/orders/entities/order-products.entity";
import { ReviewEntity } from "src/reviews/entities/review.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'product'})
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    description:string;
    @Column({type: 'decimal',precision:10,scale:2,default:0})
    price: number;
    @Column('simple-array')
    images: string[];
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(()=>UserEntity, (user) =>user.products)
    addedBy: UserEntity

    @ManyToOne(()=>CategoryEntity, (category)=>category.products)
      category:CategoryEntity;

      @OneToMany(() =>ReviewEntity,(Review) => Review.product)
      reviews:ReviewEntity[];

      @OneToMany(()=>OrderProductsEntity,(orderProduct)=>orderProduct.product)
      products:OrderProductsEntity[];
  stock: any;
}
