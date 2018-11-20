import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, ManyToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { GoalStatuses } from './interfaces';
import { Quest } from '../quests/quest.entity';

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

  @ManyToMany(type => Quest, quest => quest.goals)
  quests: Quest[];

  @ManyToOne(type => User, user => user.goals)
  user: User;
}