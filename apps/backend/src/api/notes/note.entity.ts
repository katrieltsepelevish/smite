import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { Whiteboard } from '../whiteboards/whiteboard.entity';

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

  @Column()
  selectedBy: string;

  @ManyToOne(() => Whiteboard, (whiteboard) => whiteboard.notes, {
    onDelete: 'CASCADE',
  })
  whiteboard: Whiteboard;
}
