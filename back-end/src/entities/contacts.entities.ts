import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import Client from "./clients.entities";

@Entity("contacts")
class Contacts {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 80, unique: true })
  name: string;

  @Column({ length: 80, unique: true })
  email: string;

  @Column()
  phone_number: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Client)
  client: Client;
}

export default Contacts;
