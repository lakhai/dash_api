import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { User } from 'user';

@Entity({ name: 'feed' })
export class Feed extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  alias: string;

  @Column()
  url: string;

  @Column()
  titleKey: string;

  @Column()
  bodyKey: string;

  @Column()
  imageKey?: string;

  @Column()
  authorKey?: string;

  @Column()
  dateKey?: string;

  @Column({ type: 'datetime' })
  created: string;

  @Column({ type: 'datetime' })
  updated: string;

  @ManyToOne(type => User, user => user.feeds)
  user: User;
}