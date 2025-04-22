import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'reviews'})
export class ReviewEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    ratings:number;
    @Column()
    comment:string;
    @CreateDateColumn()
    createdAt:Date
    @UpdateDateColumn()
    updatedAt:Date

    @ManyToOne(type => UserEntity,(user) => user.reviews)
    user:UserEntity;

    @ManyToOne(type => ProductEntity, (product) => product.reviews)
    product:ProductEntity

}
