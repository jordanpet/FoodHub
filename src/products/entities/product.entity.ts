import { title } from "process";
import { CategoryEntity } from "src/categories/entities/category.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}
