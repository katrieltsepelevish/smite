import {
  Entity,
  Column,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
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

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.id, { nullable: true })
  selectedBy: User;

  @ManyToOne(() => Whiteboard, (whiteboard) => whiteboard.notes, {
    onDelete: 'CASCADE',
  })
  whiteboard: Whiteboard;
}
