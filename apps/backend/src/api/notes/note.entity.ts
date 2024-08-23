import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

import { Whiteboard } from '../whiteboards/whiteboard.entity';

@Entity({
  name: 'notes',
})
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('json')
  position: { x: number; y: number };

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  selectedBy: string;

  @ManyToOne(() => Whiteboard, (whiteboard) => whiteboard.notes, {
    onDelete: 'CASCADE',
  })
  whiteboard: Whiteboard;
}
