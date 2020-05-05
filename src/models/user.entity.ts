import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;
  
  @Column('text')
  password: string;

  @Column('boolean', { default: false })
  seller: boolean;
    
  @Column('simple-json')
  address: {
    add1: string;
    add2: string;
    city: string;
    state: string;
    country: string;
    zip: number;
  };

  @OneToMany(() => Product, product => product.owner)
  products: Product[];
  
  @OneToMany(_type => Order, order => order.owner)
  orders: Order;

  @CreateDateColumn()
  createdAt: string;
  
  @UpdateDateColumn()
  updatedAt: string; 
}
