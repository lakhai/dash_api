import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, ManyToMany } from 'typeorm';
import { Goal } from 'goals/goal.entity';
import { User } from 'user';

export enum JournalStatuses {
  Publish = 'Published',
  Draft = 'Draft',
  Trash = 'Trash',
}

@Entity({ name: 'journal' })
export class Journal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  body: string;

  @Column({ enum: JournalStatuses, default: JournalStatuses.Draft })
  status: JournalStatuses;

  @ManyToOne(type => User, user => user.journal)
  user: User;

  @Column({ type: 'datetime' })
  created: string;

  @Column({ type: 'datetime' })
  updated: string;
}