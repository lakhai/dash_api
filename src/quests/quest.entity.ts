import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, ManyToMany } from 'typeorm';
import { Goal } from 'goals/goal.entity';
import { User } from 'user';

@Entity({ name: 'quest' })
export class Quest extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  currentDifficulty: number;

  @ManyToMany(type => Goal, goal => goal.quests)
  goals: Goal[];

  @ManyToOne(type => User, user => user.goals)
  user: User;
}