import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'user';
import { Skill } from 'skills/skill.entity';

export interface UserSkillConstructor {
  user: User;
  skill: Skill;
}

@Entity({ name: 'skill_user' })
export class UserSkill extends BaseEntity {
  constructor(data: UserSkillConstructor) {
    super();
    const { user, skill } = data;
    this.skill = skill;
    this.user = user;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currentXp: number;

  // @Column()
  // tiers: [];

  @ManyToOne(type => User, user => user.skills)
  user: User;

  @ManyToOne(type => Skill, skill => skill.users)
  skill: Skill;

  @CreateDateColumn()
  created;

  @UpdateDateColumn()
  updated;
}