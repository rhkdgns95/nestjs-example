import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { Product } from './product.entity';
import { Order } from './order.entity';
import { hashSync, compareSync } from 'bcryptjs';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  userName: string;

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

  @OneToMany(
    () => Product,
    product => product.owner,
  )
  products: Product[];

  @OneToMany(
    _type => Order,
    order => order.owner,
  )
  orders: Order;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @BeforeInsert()
  hashPassword = () => {
    if (this.password) {
      const hashed = hashSync(this.password, 10);
      this.password = hashed;
    }
  };
  
  comparePassowrd = (password: string): boolean => {
    const isValid: boolean = compareSync(password, this.password);
    return isValid;
  };
}
