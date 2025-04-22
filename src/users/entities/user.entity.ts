import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, JoinTable } from 'typeorm';
import { Roles } from 'src/utility/common/user.role.enum';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { ProductEntity } from 'src/products/entities/product.entity';
import { ReviewEntity } from 'src/reviews/entities/review.entity';
import { OrderEntity } from 'src/orders/entities/order.entity';
// import { Address } from './address.entity';

@Entity({name:'users'})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: Roles, array: false, default: [Roles.USER] }) 
  roles: Roles[];

  @Column({ nullable: true })
  phone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => CategoryEntity, (category) => category.addedBy)
  categories: CategoryEntity[];

  @OneToMany(()=> ProductEntity, (product) => product.addedBy)
  products: ProductEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.user)
  reviews: ReviewEntity[];

  @OneToMany(()=>OrderEntity,(order)=>order.updateBy)
  ordersUpdateBy:OrderEntity[];

  @OneToMany(()=>OrderEntity,(order)=> order.user)
  orders:OrderEntity[];
}
