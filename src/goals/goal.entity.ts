import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { User } from '../user/user.entity';
import { GoalStatuses } from './interfaces';

@Entity({ name: 'goal' })
export class Goal extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  awards: number;

  @Column({ enum: GoalStatuses, default: GoalStatuses.InProgress })
  status: GoalStatuses;

  @ManyToOne(type => User, user => user.goals)
  user: User;
}