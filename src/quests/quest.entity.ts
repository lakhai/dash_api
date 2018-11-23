import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, ManyToMany, JoinTable } from 'typeorm';
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
  @JoinTable()
  goals: Goal[];

  @ManyToMany(type => Quest, quest => quest.quests)
  @JoinTable()
  quests: Quest[];

  @ManyToOne(type => User, user => user.quests)
  user: User;
}