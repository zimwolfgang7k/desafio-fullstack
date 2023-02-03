import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import Contacts from "./contacts.entities";

@Entity("clients")
class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 70, unique: true })
  name: string;

  @Column({ length: 80, unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  phone_number: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Contacts, (Contacts) => Contacts.client)
  contacts: Contacts[];
}

export default Client;
