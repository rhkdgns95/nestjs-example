import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity('product')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    _type => User,
    user => user.products,
  )
  owner: User;

  @Column()
  ownerId: number;

  @ManyToOne(
    _type => Order,
    order => order.products,
  )
  order: Order;

  @Column()
  orderId: number;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  image: string;

  @Column('text')
  price: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
