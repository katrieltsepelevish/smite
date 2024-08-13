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

  @Column({ type: 'uuid' })
  ownerId: string;

  @ManyToMany(() => User, (user) => user.whiteboards)
  users: User[];

  @OneToMany(() => Note, (note) => note.whiteboard, { nullable: true })
  notes: Note[];
}
