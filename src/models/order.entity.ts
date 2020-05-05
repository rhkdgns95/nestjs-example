import { PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, Column, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";
import { Entity } from "typeorm";

@Entity('order')
export class Order extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(_type => User, user => user.orders)
  owner: User 
  
  @Column()
  ownerId: number;

  @OneToMany(_type => Product, product => product.order)
  products: Product[];
  
  @Column('int', { default: 0 })
  totalPrice: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}