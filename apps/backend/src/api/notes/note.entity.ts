import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Whiteboard } from '../whiteboards/whiteboard.entity';
import { User } from '../users/user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb')
  position: { x: number; y: number };

  @Column()
  name: string;

  @OneToOne(() => User, (user) => user.id)
  selectedBy: User;

  @ManyToOne(() => Whiteboard, (whiteboard) => whiteboard.notes)
  whiteboard: Whiteboard;
}
