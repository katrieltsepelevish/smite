import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../users/user.entity';
import { Note } from '../notes/note.entity';

@Entity()
export class Whiteboard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  token: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  ownerId: string;

  @ManyToMany(() => User, (user) => user.whiteboards, { onDelete: 'CASCADE' })
  users: User[];

  @OneToMany(() => Note, (note) => note.whiteboard, { nullable: true })
  notes: Note[];
}
